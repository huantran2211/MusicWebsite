using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Services;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TamTrangController : ControllerBase
    {
        public readonly ITamTrangServices _tamTrangServices;

        public TamTrangController(ITamTrangServices tamTrangServices)
        {
            _tamTrangServices = tamTrangServices;
        }

        [HttpGet("getalltamtrang")]
        public async Task<IActionResult> GetAllTamTrang()
        {
            try
            {
                List<TamTrangDTO> result = await _tamTrangServices.GetAllTamTrang();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("gettamtrangbyid")]
        public async Task<IActionResult> GetTamTrangById(Guid Id)
        {
            try
            {
                TamTrangDTO result = await _tamTrangServices.GetTamTrangById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addtamtrang")]
        public async Task<IActionResult> AddTamTrang([FromForm] TamTrangModal modal)
        {
            try
            {
                ResultModel result = await _tamTrangServices.AddTamTrang(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateTamTrang")]
        public async Task<IActionResult> UpdateTamTrang([FromForm] TamTrangModal modal)
        {
            try
            {
                ResultModel result = await _tamTrangServices.UpdateTamTrang(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletetamtrang")]
        public async Task<IActionResult> DeleteTamTrang(Guid id)
        {
            try
            {
                ResultModel result = await _tamTrangServices.DeleteTamTrang(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
