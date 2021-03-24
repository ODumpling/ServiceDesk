using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Tickets.Queries.SingleTicket;

namespace ServiceDesk.Application.Comments.Queries.SingleComment
{
    public class SingleComment : IRequest<SingleTicketVm.CommentDto>
    {
        public SingleComment(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }

        public class QueryHandler : IRequestHandler<SingleComment, SingleTicketVm.CommentDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public QueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<SingleTicketVm.CommentDto> Handle(SingleComment request, CancellationToken cancellationToken)
            {
                var comment = await _context.Comments
                    .Where(x => x.Id == request.Id)
                    .ProjectTo<SingleTicketVm.CommentDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(cancellationToken);

                return comment;
            }
        }
    }
}