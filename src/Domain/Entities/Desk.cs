using System;
using System.Collections.Generic;
using ServiceDesk.Domain.Common;

namespace ServiceDesk.Domain.Entities
{
    public class Desk : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Manager { get; set; }
        public IList<Ticket> Tickets { get; set; } = new List<Ticket>();
        public IList<Issue> Issues { get; set; } = new List<Issue>();

        public static Desk Create(string slug, string name, string description, string manager)
        {
            return new Desk
            {
                Slug = slug,
                Name = name,
                Description = description,
                Manager = manager
            };
        }
    }
}