using System;
using ServiceDesk.Domain.Common;

namespace ServiceDesk.Domain.Entities
{
    public class Comment : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Description { get; set; }

        public static Comment Create(string description)
        {
            return new Comment
            {
                Description = description
            };
        }
    }
}