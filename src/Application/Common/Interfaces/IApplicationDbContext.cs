using ServiceDesk.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceDesk.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<TodoList> TodoLists { get; set; }
        DbSet<TodoItem> TodoItems { get; set; }
        DbSet<Ticket> Tickets { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
