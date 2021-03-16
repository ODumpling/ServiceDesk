using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Desks.Commands
{
    public class CreateDeskCommand : IRequest<Guid>
    {
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Manager { get; set; }

        public class CommandHandler : IRequestHandler<CreateDeskCommand,Guid>
        {
            private readonly IApplicationDbContext _context;

            public CommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<Guid> Handle(CreateDeskCommand request, CancellationToken cancellationToken)
            {
                var desk = Desk.Create(request.Slug, request.Name, request.Description, request.Manager);

                _context.Desks.Add(desk);

                await _context.SaveChangesAsync(cancellationToken);

                return desk.Id;
            }
        }
    }
}