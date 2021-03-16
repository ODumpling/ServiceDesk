using System;
using System.Collections.Generic;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Desks.Queries.SingleDesk
{
    public class SingleDeskVm
    {
        public DeskDto Desk { get; set; }

        public class DeskDto : IMapFrom<Desk>
        {
            public Guid Id { get; set; }
            public string Slug { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Manager { get; set; }
            public IList<TicketDto> Tickets { get; set; }

        }

        public class TicketDto : IMapFrom<Ticket>
        {
            public Guid Id { get; set; }
            public string Description { get; set; }
            public string Issue { get; set; }
        }
    }
}