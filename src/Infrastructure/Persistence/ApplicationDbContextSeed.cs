using System;
using ServiceDesk.Domain.Entities;
using ServiceDesk.Domain.ValueObjects;
using ServiceDesk.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            var administratorRole = new IdentityRole("Administrator");

            if (roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await roleManager.CreateAsync(administratorRole);
            }

            var administrator = new ApplicationUser {UserName = "admin@localhost", Email = "admin@localhost"};

            if (userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await userManager.CreateAsync(administrator, "Administrator1!");
                await userManager.AddToRolesAsync(administrator, new[] {administratorRole.Name});
            }
        }

        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            // Seed, if necessary
           

            if (!context.Desks.Any())
            {
                context.Desks.Add(new Desk
                {
                    Name = "IT Helpdesk",
                    Slug = "IT",
                    Description = "We help with all your IT needs.",
                    Issues =
                    {
                        new Issue{Name = "Application - A"},
                        new Issue{Name = "Application - B"},
                        new Issue{Name = "Application - C"},
                        new Issue{Name = "Desktop"},
                        new Issue{Name = "Hardware"},
                        new Issue{Name = "Software"},
                    }
                });

                context.Desks.Add(new Desk
                {
                    Name = "HR Helpdesk",
                    Slug = "HR",
                    Description = "We help with all your HR needs.",
                    Issues =
                    {
                        new Issue{Name = "Holiday"},
                        new Issue{Name = "Payroll"},
                        new Issue{Name = "Leaver"},
                        new Issue{Name = "New Starter"},
                        new Issue{Name = "Maternity"},
                    }
                });

                context.Desks.Add(new Desk
                {
                    Name = "Facilities Helpdesk",
                    Slug = "Facilities",
                    Description = "We help with all your Facility needs.",
                    Issues =
                    {
                        new Issue{Name = "Cleaning"},
                        new Issue{Name = "Workplace Assessment"},
                        new Issue{Name = "Car"},
                    }
                });
            }

            if (context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }
    }
}