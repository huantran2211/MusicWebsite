using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichSuNgheNhacController : ControllerBase
    {
        private readonly ILichSuNgheNhacServices _lichSuNgheNhacServices;
        public LichSuNgheNhacController(ILichSuNgheNhacServices lichSuNgheNhacServices)
        {
            _lichSuNgheNhacServices = lichSuNgheNhacServices;
        }
        [HttpGet("getalllichsu")]
        public async Task<IActionResult> GetAllLichSuNgheNhac()
        {
            try
            {
                List<LichSuNgheNhacDTO> result =await _lichSuNgheNhacServices.GetAllLichSu();
                return Ok(result);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlichsubyid")]
        public async Task<IActionResult> GetLichSuNgheNhacById(Guid Id)
        {
            try
            {
               LichSuNgheNhacDTO result = await _lichSuNgheNhacServices.GetLichSuNgheNhacById(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlichsubyUserId")]
        public async Task<IActionResult> GetLichSuNgheNhacByUserId(Guid Id)
        {
            try
            {
                List<LichSuNgheNhacDTO> result = await _lichSuNgheNhacServices.GetLichSuNGheNhacByUserId(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("addlichsunghenhac")]
        public async Task<IActionResult> AddLichSuNgheNhac([FromForm] LichSuNgheNhacModel model)
        {
            try
            {
                ResultModel result = await _lichSuNgheNhacServices.AddLichSuNGheNhac(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletelichsu")]
        public async Task<IActionResult> DeleteLichSuNgheNhac(Guid id)
        {
            try
            {
                ResultModel result = await _lichSuNgheNhacServices.DeleteLichSuNgheNhac(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
