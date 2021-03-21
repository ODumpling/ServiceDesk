using System;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Tickets.Queries.PaginatedTickets
{
    public class UserTicketDto : IMapFrom<Ticket>
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Issue { get; set; }
        public DateTime Created { get; set; }
    }
}