using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThuVienController : ControllerBase
    {
        private readonly IThuVienServices _thuVienServices;

        [HttpGet("getallthuvien")]
        public async Task<IActionResult> GetAllThuVien()
        {
            try
            {
                List<ThuVienDTO> result = await _thuVienServices.GetAllThuVien();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getthuvienbainhacbythuvienid")]
        public async Task<IActionResult> GetThuVienBaiNhacByThuVienId(Guid id)
        {
            try
            {
                List<ThuVienBaiNhacDTO> result = await _thuVienServices.GetThuVienBaiNhacByThuVienId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getthuvienbainhacbyuserid")]
        public async Task<IActionResult> GetThuVienBaiNhacByUserId(Guid id)
        {
            try
            {
                ThuVienDTO result = await _thuVienServices.GetThuVienByUserId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        public ThuVienController(IThuVienServices thuVienServices)
        {
            _thuVienServices = thuVienServices;
        }

        [HttpPost("addthuvien")]
        public async Task<IActionResult> AddThuVien(ThuVienModal modal)
        {
            try
            {
                ResultModel result =await _thuVienServices.AddThuVien(modal);
                return Ok(result);
            }  catch (Exception ex)
            {
                return BadRequest(ex.Message);
            } 
        }

        [HttpPost("addthuvienbainhac")]
        public async Task<IActionResult> AddThuVienBaiNhc(ThuVienBaiNhacModal modal)
        {
            try
            {
                ResultModel result = await _thuVienServices.AddThuVienBaiNahc(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    
        [HttpDelete("deletethuvienbainhac")]
        public async Task<IActionResult> DeleteThuVienBaiNhac(Guid thuVienId , Guid baiNhacId)
        {
            try
            {
                ResultModel result = await _thuVienServices.DeleteThuVienBaiNhac(thuVienId , baiNhacId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
