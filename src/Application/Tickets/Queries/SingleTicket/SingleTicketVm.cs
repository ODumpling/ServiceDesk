using System;
using System.Collections.Generic;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Tickets.Queries.SingleTicket
{
    public class SingleTicketVm
    {
        public TicketDto Ticket { get; set; }

        public class TicketDto : IMapFrom<Ticket>
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public string Issue { get; set; }
            public IList<CommentDto> Comments {get;set;}
        }
        public class CommentDto : IMapFrom<Comment>
        {
            public Guid Id { get; set; }
            public string Description { get; set; }
            public DateTime Created { get; set; }
            public string CreatedBy { get; set; }
        }
    }

}