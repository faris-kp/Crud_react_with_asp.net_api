
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using sample_crud_be.Model;

namespace sample_crud_be
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddDbContext<EmployeeMycontext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection")));
            builder.Services.AddCors();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
           
            app.UseCors(builder =>
            {
                builder.
                  AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();

            });

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
