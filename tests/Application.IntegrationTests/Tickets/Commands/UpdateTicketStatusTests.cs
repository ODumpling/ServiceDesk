using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using ServiceDesk.Application.Common.Exceptions;
using ServiceDesk.Application.Tickets.Commands;
using ServiceDesk.Domain.Entities;
using ServiceDesk.Domain.Enums;

namespace ServiceDesk.Application.IntegrationTests.Tickets.Commands
{
    using static Testing;
    public class UpdateTicketStatusTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumValues()
        {
            var command = new UpdateTicketStatusCommand();

            FluentActions.Invoking(() => SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldBeAbleToUpdateStatus()
        {
            var userId = await RunAsAdministratorAsync();

            var slug = "test-slug";

            var desk = Desk.Create(slug, "test-name", "onetwothreefourfive", "159qsc875asd321zxc");

            await AddAsync(desk);

            var commandone = new CreateTicketCommand
            {
                slug = slug,
                Issue = "One Issue",
                Description = "three four five"
            };

            var result = await SendAsync(commandone);

            var command = new UpdateTicketStatusCommand
            {
                Id = result,
                Status = Status.Assigned
            };

            var res = await SendAsync(command);

            var ticket = await FindAsync<Ticket>(result);

            ticket.Status.Should().Be(Status.Assigned);
        }
    }
}