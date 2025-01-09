using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheLoaiController : ControllerBase
    {
        public readonly ITheLoaiServices _theLoaiServices;
        public TheLoaiController(ITheLoaiServices theLoaiServices) {
            _theLoaiServices = theLoaiServices;
        }

        [HttpGet("GetAllTheLoai")]
        public async Task<IActionResult> GetAllTheLoai()
        {
            try {
                List<TheLoaiDTO> result = await _theLoaiServices.GetAllTheLoai();
                return Ok(result);
            }
            catch (ArgumentException ex)
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllTheLoaiById")]
        public async Task<IActionResult> GetTheLoaiById(Guid Id)
        {
            try
            {
                TheLoaiDTO result = await _theLoaiServices.GetTheLoaiById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddTheLoai")]
        public async Task<IActionResult> AddTheLoai([FromForm] TheLoaiModal modal)
        {
            try
            {
                ResultModel result = await _theLoaiServices.AddTheLoai(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("UpdateTheLoai")]
        public async Task<IActionResult> UpdateTheLoai([FromForm]  TheLoaiModal modal)
        {
            try
            {
                ResultModel result = await _theLoaiServices.UpdateTheLoai(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteTheLoai")]
        public async Task<IActionResult> DeleteTheLoai(Guid id)
        {
            try
            {
                ResultModel result = await _theLoaiServices.DeleteTheLoai(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }





    }
}
