using ServiceDesk.Application.Common.Interfaces;
using System;

namespace ServiceDesk.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
