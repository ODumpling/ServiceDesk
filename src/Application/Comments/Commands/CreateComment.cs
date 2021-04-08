using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
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
        public CreateComment()
        {
            
        }
        public CreateComment(int ticketId, string description)
        {
            TicketId = ticketId;
            Description = description;
        }

        public int TicketId { get; set; }
        public string Description { get; set; }

        public class CreateCommentValidator : AbstractValidator<CreateComment>
        {
            private readonly IApplicationDbContext _context;

            public CreateCommentValidator(IApplicationDbContext context)
            {
                _context = context;

                RuleFor(x => x.TicketId)
                    .MustAsync(TicketMustExist)
                    .NotNull();

                RuleFor(x => x.Description)
                    .NotNull()
                    .MaximumLength(250);
            }

            public async Task<bool> TicketMustExist(CreateComment command, int ticketId,
                CancellationToken cancellationToken)
            {
                var result = await _context.Tickets
                    .Where(x => x.Id == ticketId)
                    .SingleOrDefaultAsync(cancellationToken);

                return result != null;
            }
        }


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