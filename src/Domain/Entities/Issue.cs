using System;

namespace ServiceDesk.Domain.Entities
{
    public class Issue
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public static Issue Create(string name)
        {
            return new Issue
            {
                Name = name
            };
        }
    }
}