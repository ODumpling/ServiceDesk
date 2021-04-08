using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using ServiceDesk.Application.Comments.Commands;
using ServiceDesk.Application.Common.Exceptions;

namespace ServiceDesk.Application.IntegrationTests.Comments.Command
{
    using static Testing;

    public class CreateCommentTests : TestBase
    {
        [Test]
        public async Task ShouldRequireMinimumFields()
        {
            await RunAsDefaultUserAsync();
            var command = new CreateComment();
            FluentActions.Invoking(() => SendAsync(command)).Should().Throw<ValidationException>();
        }
    }
}