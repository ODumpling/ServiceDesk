using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Security;
using ServiceDesk.Domain.Enums;

namespace ServiceDesk.Application.Tickets.Commands
{
    [Authorize]
    public class UpdateTicketStatusCommand : IRequest<bool>
    {
        public int Id { get; set; }
        public Status Status { get; set; }

        public class CommandHandler : IRequestHandler<UpdateTicketStatusCommand, bool>  
        {
            private readonly IApplicationDbContext _context;

            public CommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(UpdateTicketStatusCommand request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets.FindAsync(request.Id);

                ticket.UpdateStatus(request.Status);

                var result = await _context.SaveChangesAsync(cancellationToken);

                return result > 0;
            }
        }
    }
}