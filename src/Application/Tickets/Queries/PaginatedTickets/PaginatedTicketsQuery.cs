using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Application.Common.Security;
using ServiceDesk.Domain.Enums;

namespace ServiceDesk.Application.Tickets.Queries.PaginatedTickets
{
    [Authorize]
    public class PaginatedTicketsQuery : IRequest<PaginatedTicketViewModel>
    {
        public PaginatedTicketsQuery(int pageNumber, int pageSize, string slug)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            Slug = slug;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Slug { get; set; }

        public class QueryHandler : IRequestHandler<PaginatedTicketsQuery, PaginatedTicketViewModel>
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

            public async Task<PaginatedTicketViewModel> Handle(PaginatedTicketsQuery request,
                CancellationToken cancellationToken)
            {
                return new PaginatedTicketViewModel
                {
                    List = await _context.Tickets
                        .Where(x => x.Desk.Slug == request.Slug)
                        .Where(x => x.CreatedBy == _currentUser.UserId)
                        .OrderBy(x => x.Created)
                        .ProjectTo<UserTicketDto>(_mapper.ConfigurationProvider)
                        .ToPaginatedListAsync(request.PageNumber, request.PageSize),

                    Status = Enum.GetValues(typeof(Status)).Cast<Status>().Select(x =>
                        new PaginatedTicketViewModel.StatusDto
                        {
                            Value = (int) x,
                            Name = x.ToString(),
                        }).ToList()
                };
            }
        }
    }
}