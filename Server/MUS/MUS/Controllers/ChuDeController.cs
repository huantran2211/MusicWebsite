using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuDeController : ControllerBase
    {
        public readonly IChudeServices _chudeServices;
        public ChuDeController(IChudeServices chudeServices)
        {
            _chudeServices = chudeServices;
        }

        [HttpGet("getallchude")]
        public async Task<IActionResult> GetAllChuDe()
        {
            try
            {
                List<ChuDeDTO> result = await _chudeServices.GetAllChuDe();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getchudebyid")]
        public async Task<IActionResult> GetChuDeById(Guid Id)
        {
            try
            {
                ChuDeDTO result = await _chudeServices.GetChuDeById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addchude")]
        public async Task<IActionResult> AddChuDe([FromForm] ChuDeModal modal)
        {
            try
            {
                ResultModel result = await _chudeServices.AddChuDe(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatechude")]
        public async Task<IActionResult> UpdateChuDe([FromForm] ChuDeModal modal)
        {
            try
            {
                ResultModel result = await _chudeServices.UpdateChuDe(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletechude")]
        public async Task<IActionResult> DeleteChuDe(Guid id)
        {
            try
            {
                ResultModel result = await _chudeServices.DeleteChuDe(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
