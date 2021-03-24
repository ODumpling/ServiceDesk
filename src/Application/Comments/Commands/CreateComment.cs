using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Security;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Comments.Commands
{
    [Authorize]
    public class CreateComment : IRequest<Guid>
    {
        public CreateComment(int ticketId, string description)
        {
            TicketId = ticketId;
            Description = description;
        }

        public int TicketId { get; set; }
        public string Description { get; set; }

        public class CommandHandler : IRequestHandler<CreateComment, Guid>
        {
            private readonly IApplicationDbContext _context;

            public CommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Guid> Handle(CreateComment request, CancellationToken cancellationToken)
            {
                var comment = Comment.Create(request.Description);

                var ticket = await _context.Tickets.FindAsync(request.TicketId);

                ticket.Comments.Add(comment);

                await _context.SaveChangesAsync(cancellationToken);

                return comment.Id;
            }
        }
    }
}