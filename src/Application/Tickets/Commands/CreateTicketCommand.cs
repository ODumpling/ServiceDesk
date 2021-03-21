using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Application.Common.Security;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Tickets.Commands
{
    [Authorize]
    public class CreateTicketCommand : IRequest<int>
    {
        public string slug { get; set; }
        public string Issue { get; set; }

        public string Description { get; set; }
        
        public class Handler : IRequestHandler<CreateTicketCommand, int>
        {
            private readonly IApplicationDbContext _context;

            public Handler(IApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<int> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
            {
                var desk = await _context.Desks.Where(x => x.Slug == request.slug).FirstOrDefaultAsync(cancellationToken);
                var ticket = Ticket.Create(request.Description, request.Issue);

                desk.Tickets.Add(ticket);

                await _context.SaveChangesAsync(cancellationToken);

                return ticket.Id;
            }
        }

    }
}