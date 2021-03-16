using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Application.Desks.Commands;
using ServiceDesk.Application.Desks.Queries.SingleDesk;

namespace ServiceDesk.WebUI.Controllers
{
    public class DesksController : ApiControllerBase
    {
        [HttpGet]
        public Task<ActionResult> ListDesks()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<SingleDeskVm>> GetDesk(string slug)
        {
            return await Mediator.Send(new SingleDeskQuery {Slug = slug});
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateDesk(CreateDeskCommand command)
        {
            var result = await Mediator.Send(command);

            return CreatedAtAction(nameof(GetDesk), new {slug = command.Slug}, result);
        }

        [HttpPatch]
        public Task<ActionResult> UpdateDesk()
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public Task<ActionResult> DeleteDesk()
        {
            throw new NotImplementedException();
        }
    }
}