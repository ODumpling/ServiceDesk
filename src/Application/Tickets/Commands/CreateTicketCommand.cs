using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Security;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Tickets.Commands
{
    [Authorize]
    public class CreateTicketCommand : IRequest<Guid>
    {
        public string Issue { get; set; }

        public string Description { get; set; }
        
        public class Handler : IRequestHandler<CreateTicketCommand, Guid>
        {
            private readonly IApplicationDbContext _context;

            public Handler(IApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<Guid> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
            {

                var ticket = Ticket.Create(request.Description, request.Issue);

                _context.Tickets.Add(ticket);

                await _context.SaveChangesAsync(cancellationToken);

                return ticket.Id;
            }
        }

    }
}