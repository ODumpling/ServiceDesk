using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Application.Common.Models;
using ServiceDesk.Application.Tickets.Commands;
using ServiceDesk.Application.Tickets.Queries.PaginatedTickets;
using ServiceDesk.Application.Tickets.Queries.SingleTicket;

namespace ServiceDesk.WebUI.Controllers
{
    public class TicketsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<UserTicketDto>>> ListDeskTickets(string slug, [FromQuery] int page,
            [FromQuery] int size)
        {
            return await Mediator.Send(new PaginatedTicketsQuery(page, size, slug));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SingleTicketVm>> GetTicket(string slug, int id)
        {
            return await Mediator.Send(new SingleTicketQuery {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateTicket(string slug, CreateTicketCommand command)
        {
            command.slug = slug;
            var result = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetTicket), new {id = result}, result);
        }

        //
        // [HttpPatch]
        // public Task<ActionResult> UpdateTicket(string slug)
        // {
        //     throw new NotImplementedException();
        // }
        //
        // [HttpDelete]
        // public Task<ActionResult> DeleteTicket(string slug)
        // {
        //     throw new NotImplementedException();
        // }
    }
}