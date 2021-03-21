using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Tickets.Queries.SingleTicket;

namespace ServiceDesk.Application.Desks.Queries.SingleDesk
{
    public class SingleDeskQuery : IRequest<SingleDeskVm>
    {
        public string Slug { get; set; }

        public class QueryHandler : IRequestHandler<SingleDeskQuery , SingleDeskVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUser;

            public QueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
            {
                _context = context;
                _mapper = mapper;
                _currentUser = currentUser;
            }
            public async Task<SingleDeskVm> Handle(SingleDeskQuery request, CancellationToken cancellationToken)
            {
                var userId = _currentUser.UserId;
                return new SingleDeskVm
                {
                     Desk = await _context.Desks
                         .Where(x => x.Slug == request.Slug)
                         .Include(x => x.Issues)
                         .ProjectTo<SingleDeskVm.DeskDto>(_mapper.ConfigurationProvider)
                         .SingleOrDefaultAsync(cancellationToken)

                };
            }
        }
    }
}