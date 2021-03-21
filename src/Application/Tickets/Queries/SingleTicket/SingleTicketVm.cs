using System;
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
        }
    }
}