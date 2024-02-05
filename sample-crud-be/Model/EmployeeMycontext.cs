using Microsoft.EntityFrameworkCore;
namespace sample_crud_be.Model
{
    public class EmployeeMycontext:DbContext
    {
        public EmployeeMycontext(DbContextOptions<EmployeeMycontext> options):base(options)
        {
            
        }
        public DbSet<Employe> employes { get; set; }    
    }
}
