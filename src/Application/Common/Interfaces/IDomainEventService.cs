using ServiceDesk.Domain.Common;
using System.Threading.Tasks;

namespace ServiceDesk.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
