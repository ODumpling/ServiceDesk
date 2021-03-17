using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Application.Tickets.Commands;
using ServiceDesk.Application.Tickets.Queries.SingleTicket;

namespace ServiceDesk.WebUI.Controllers
{
    
    public class TicketsController : ApiControllerBase
    {
        [HttpGet]
        public Task<ActionResult> ListDeskTickets(string slug)
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SingleTicketVm>> GetTicket(string slug,Guid id)
        {
            return await Mediator.Send(new SingleTicketQuery {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateTicket(string slug,CreateTicketCommand command)
        {
            var result = await Mediator.Send(command);
            
            return CreatedAtAction(nameof(GetTicket) ,new { id = result }, result);
        }

        [HttpPatch]
        public Task<ActionResult> UpdateTicket(string slug)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public Task<ActionResult> DeleteTicket(string slug)
        {
            throw new NotImplementedException();
        }

    }

}