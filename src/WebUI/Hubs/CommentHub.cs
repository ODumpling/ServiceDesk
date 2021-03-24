using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using ServiceDesk.Application.Comments.Commands;
using ServiceDesk.Application.Comments.Queries.SingleComment;
using ServiceDesk.Application.Common.Interfaces;

namespace ServiceDesk.WebUI.Hubs
{
    public class CommentHub : Hub
    {
        private readonly ISender _mediator;
        private readonly ILogger<CommentHub> _logger;

        public CommentHub(ISender mediator, ILogger<CommentHub> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        public async Task SendComment(string ticketId, string description)
        {
            var user = Context.UserIdentifier;
            _logger.LogDebug("User {User} - Ticket Id {Id} - Description {DId}",user, ticketId, description);
             var command = new CreateComment(int.Parse(ticketId), description);
             var result = await _mediator.Send(command);
            // _logger.LogDebug("User Id {Id} Comment Id {cId}", _userService.UserId, result);
            var comment = await _mediator.Send(new SingleComment(result));
            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}