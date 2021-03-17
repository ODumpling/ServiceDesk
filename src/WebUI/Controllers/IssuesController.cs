using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Application.Issues.Commands;

namespace ServiceDesk.WebUI.Controllers
{
    public class IssuesController : ApiControllerBase
    {
        [HttpGet]
        public Task<ActionResult> ListIssues()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public Task<ActionResult> GetIssue()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateIssue(string slug,CreateIssueCommand command)
        {
            if (command.Slug != slug)
            {
                return BadRequest();
            }
            return await Mediator.Send(command);
        }

        [HttpPatch]
        public Task<ActionResult> UpdateIssue()
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public Task<ActionResult> DeleteIssue()
        {
            throw new NotImplementedException();
        }
    }
}