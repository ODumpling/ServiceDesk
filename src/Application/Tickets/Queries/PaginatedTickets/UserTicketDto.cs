using System;
using AutoMapper;
using ServiceDesk.Application.Common.Mappings;
using ServiceDesk.Domain.Entities;
using ServiceDesk.Domain.Enums;

namespace ServiceDesk.Application.Tickets.Queries.PaginatedTickets
{
    public class UserTicketDto : IMapFrom<Ticket>
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Issue { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Ticket, UserTicketDto>()
                .ForMember(d => d.Status, opt => opt.MapFrom(s => (int) s.Status));
        }
    }
}