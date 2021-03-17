using ServiceDesk.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceDesk.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Desk> Desks { get; set; }
        DbSet<Issue> Issues { get; set; }
        DbSet<Ticket> Tickets { get; set; }
        DbSet<TodoList> TodoLists { get; set; }
        DbSet<TodoItem> TodoItems { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
