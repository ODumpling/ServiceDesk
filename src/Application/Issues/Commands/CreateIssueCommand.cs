using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Application.Common.Interfaces;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Issues.Commands
{
    public class CreateIssueCommand : IRequest<Guid>
    {
        public string Name { get; set; }

        public string Slug { get; set; }

        public class CommandValidator : AbstractValidator<CreateIssueCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name)
                    .MinimumLength(3)
                    .MaximumLength(20)
                    .NotEmpty();

                RuleFor(x => x.Slug)
                    .MinimumLength(3)
                    .MaximumLength(20)
                    .NotEmpty();
            }
        }

        public class CommandHandler : IRequestHandler<CreateIssueCommand, Guid>
        {
            private readonly IApplicationDbContext _context;

            public CommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Guid> Handle(CreateIssueCommand request, CancellationToken cancellationToken)
            {
                var desk = await _context.Desks
                    .Where(x => x.Slug == request.Slug)
                    .SingleOrDefaultAsync(cancellationToken);

                var issue = Issue.Create(request.Name);

                desk.Issues.Add(issue);

                await _context.SaveChangesAsync(cancellationToken);

                return issue.Id;
            }
        }
    }
}