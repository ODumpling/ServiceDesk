using System;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Domain.Entities;

namespace ServiceDesk.Application.Desks.Queries.PaginatedDeskList
{
    public class PaginatedListDeskDto : IMapFrom<Desk>
    {
        public Guid Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}