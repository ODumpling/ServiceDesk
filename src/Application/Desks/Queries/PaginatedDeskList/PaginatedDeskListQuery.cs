using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Application.Common.Models;
using ServiceDesk.Application.Common.Security;

namespace ServiceDesk.Application.Desks.Queries.PaginatedDeskList
{
    [Authorize]
    public class PaginatedDeskListQuery : IRequest<PaginatedList<PaginatedListDeskDto>>
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;

        public class QueryHandler : IRequestHandler<PaginatedDeskListQuery, PaginatedList<PaginatedListDeskDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public QueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<PaginatedList<PaginatedListDeskDto>> Handle(PaginatedDeskListQuery request, CancellationToken cancellationToken)
            {
                return await _context.Desks
                    .OrderBy(x => x.Name)
                    .ProjectTo<PaginatedListDeskDto>(_mapper.ConfigurationProvider)
                    .ToPaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }
    }
}