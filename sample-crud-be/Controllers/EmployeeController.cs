using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using sample_crud_be.Model;

namespace sample_crud_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeMycontext _employeeMycontext;

        public EmployeeController(EmployeeMycontext employeeMycontext)
        {
            _employeeMycontext = employeeMycontext;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Employe>>> GetEmployes()
        {
            if(_employeeMycontext.employes == null)
            {
                return NotFound();
            }
            return await _employeeMycontext.employes.ToListAsync();
        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Employe>> GetEmploye(int id)
        {
            if (_employeeMycontext.employes == null)
            {
                return NotFound();
            }
            var employe = await _employeeMycontext.employes.FindAsync(id);
            if(employe == null)
            {
                return NotFound();
            }
            return employe;
        }
        [HttpPost]
        public  async  Task<ActionResult<Employe>> PostEmploye(Employe employe)
        {
            _employeeMycontext.employes.Add(employe);
            await _employeeMycontext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmploye), new { id=employe.Id},employe);
        }
        [HttpPut("{id}")]

        public async Task<ActionResult> PutEmploye(int id ,Employe employe)
        {
            if(id != employe.Id) 
            {
                return BadRequest();
            }
            _employeeMycontext.Entry(employe).State = EntityState.Modified;
            try
            {
                await _employeeMycontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmplye(int id)
        {
            if(_employeeMycontext.employes == null)
            {
                return NotFound();
            }
            var employe = await _employeeMycontext.employes.FindAsync(id);
            if(employe == null)
            {
                return NotFound();
            }
             _employeeMycontext.employes.Remove(employe);
            await _employeeMycontext.SaveChangesAsync();
            return Ok();
        }
    }
}

//C: \Users\asus\iprime\C#\sample-crud-be