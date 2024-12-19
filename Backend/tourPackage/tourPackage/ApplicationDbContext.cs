using Microsoft.EntityFrameworkCore;

namespace foodRecipe
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<TourUser> TourUsers { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Booking> Bookings { get; set; }

    }

}
