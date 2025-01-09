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
    public class NhacSiController : ControllerBase
    {
        public readonly INhacsiServices _nhacsiServices;

        public NhacSiController(INhacsiServices nhacsiServices)
        {
            _nhacsiServices = nhacsiServices;
        }

        [HttpGet("getallnhacsi")]
        public async Task<IActionResult> GetAllNhacSi()
        {
            try
            {
                List<NhacSiDTO> result = await _nhacsiServices.GetAllNhacSi();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getnhacsibyid")]
        public async Task<IActionResult> GetNhacSiById(Guid Id)
        {
            try
            {
                NhacSiDTO result = await _nhacsiServices.GetNhacSiById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addnhacsi")]
        public async Task<IActionResult> AddNhacSi([FromForm] NhacsiModel modal)
        {
            try
            {
                ResultModel result = await _nhacsiServices.AddNhacSi(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatenhacsi")]
        public async Task<IActionResult> UpdateNhacSi([FromForm] NhacsiModel modal)
        {
            try
            {
                ResultModel result = await _nhacsiServices.UpdateNhacSi(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletenhacsi")]
        public async Task<IActionResult> DeleteNhacSi(Guid id)
        {
            try
            {
                ResultModel result = await _nhacsiServices.DeleteNhacSi(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
