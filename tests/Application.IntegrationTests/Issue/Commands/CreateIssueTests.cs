using FluentAssertions;
using NUnit.Framework;
using ServiceDesk.Application.Common.Exceptions;
using ServiceDesk.Application.Issues.Commands;

namespace ServiceDesk.Application.IntegrationTests.Issue.Commands
{
    using static Testing;

    public class CreateIssueTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateIssueCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }
    }
}