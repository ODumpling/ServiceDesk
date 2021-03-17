using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Application.Common.Models;
using ServiceDesk.Application.Desks.Commands;
using ServiceDesk.Application.Desks.Queries.PaginatedDeskList;
using ServiceDesk.Application.Desks.Queries.SingleDesk;

namespace ServiceDesk.WebUI.Controllers
{
    [Route("api/[controller]")]
    public class DesksController : ApiControllerBase
    {
        [HttpGet]
        public async Task <ActionResult<PaginatedList<PaginatedListDeskDto>>> ListDesks([FromQuery] PaginatedDeskListQuery query)
        {
            return await Mediator.Send(query);
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

        // [HttpPut]
        // public Task<ActionResult> UpdateDesk()
        // {
        //     throw new NotImplementedException();
        // }

        // [HttpDelete]
        // public Task<ActionResult> DeleteDesk()
        // {
        //     throw new NotImplementedException();
        // }
    }
}