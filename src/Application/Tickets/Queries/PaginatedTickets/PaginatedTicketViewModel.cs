using System.Collections.Generic;
using ServiceDesk.Application.Common.Models;

namespace ServiceDesk.Application.Tickets.Queries.PaginatedTickets
{
    public class PaginatedTicketViewModel
    {
        public IList<StatusDto> Status { get; set; }

        public PaginatedList<UserTicketDto> List { get; set; }

        public class StatusDto
        {
            public int Value { get; set; }
            public string Name { get; set; }
        }
    }
}