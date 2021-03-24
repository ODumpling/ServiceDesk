using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Application.Comments.Commands;

namespace ServiceDesk.WebUI.Controllers
{
    public class CommentsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> CreateComment(CreateComment command)
        {
            await Mediator.Send(command);

            return Ok();
        }

        // [HttpGet]
        // public Task<ActionResult> ListComments()
        // {
        //     throw new NotImplementedException();
        // }
        //
        // [HttpGet("{id}")]
        // public Task<ActionResult> GetComment()
        // {
        //     throw new NotImplementedException();
        // }
        // [HttpPatch]
        // public Task<ActionResult> UpdateComment()
        // {
        //     throw new NotImplementedException();
        // }
        //
        // [HttpDelete]
        // public Task<ActionResult> DeleteComment()
        // {
        //     throw new NotImplementedException();
        // }
    }
}