using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Security;

namespace ServiceDesk.Application.Tickets.Queries.SingleTicket
{
    [Authorize]
    public class SingleTicketQuery : IRequest<SingleTicketVm>
    {
        public Guid Id { get; set; }

        public class QueryHandler : IRequestHandler<SingleTicketQuery, SingleTicketVm>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public QueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<SingleTicketVm> Handle(SingleTicketQuery request, CancellationToken cancellationToken)
            {
                return new SingleTicketVm
                {
                    Ticket = await _context.Tickets.Where(x => x.Id == request.Id)
                        .ProjectTo<SingleTicketVm.TicketDto>(_mapper.ConfigurationProvider)
                        .SingleOrDefaultAsync(cancellationToken)
                };
            }
        }
    }
}