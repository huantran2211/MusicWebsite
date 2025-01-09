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
    public class DanhSachPhatController : ControllerBase
    {
        public readonly IDanhSachPhatServices _danhSachPhatServices;
        public DanhSachPhatController(IDanhSachPhatServices danhSachPhatServices)
        {
            _danhSachPhatServices = danhSachPhatServices;
        }
        [HttpGet("getalldanhsachphat")]
        public async Task<IActionResult> GetAllDanhSachPhat()
        {
            try
            {
                List<DanhSachPhatDTO> result = await _danhSachPhatServices.GetAllDanhSachPhat();
                return Ok(result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getdanhsachphatbyid")]
        public async Task<IActionResult> GetDanhSachPhatById(Guid id)
        {
            try
            {
                DanhSachPhatDTO result = await _danhSachPhatServices.GetDanhSachPhatById(id);
                return Ok(result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getdanhsachphatbyuserid")]
        public async Task<IActionResult> GetDanhSachPhatByUserId(Guid userId)
        {
            try
            {
                List<DanhSachPhatDTO> result = await _danhSachPhatServices.GetDanhSachPhatByUserId(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getdanhsachphatbainhacbydanhsachphatid")]
        public async Task<IActionResult> GetDanhSachPhatBaiNhacByDanhSachPhatId(Guid danhSachPhatId)
        {
            try
            {
                List<DanhSachPhatBaiNhacDTO> result = await _danhSachPhatServices.GetDanhSachPhatBaiNhacByDanhSachPhatId(danhSachPhatId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("adddanhsachphat")]
        public async Task<IActionResult> AddDanhSachPhat([FromForm] danhSachPhatModal modal)
        {
            try
            {
                ResultModel result = await _danhSachPhatServices.AddDanhSachPhat(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("adddanhsachphatbainhac")]
        public async Task<IActionResult> AddDanhSachPhatBaiNhac([FromForm] DanhSachPhatBaiNhacModal modal)
        {
            try
            {
                ResultModel result = await _danhSachPhatServices.AddDanhSachphatBaiNhac(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletedanhsachphat")]
        public async Task<IActionResult> DeleteDanhSachPhat(Guid id)
        {
            try
            {
                ResultModel result = await _danhSachPhatServices.DeleteDanhSachPhat(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletedanhsachphatbainhac")]
        public async Task<IActionResult> DeleteDanhSachPhatbainhac(Guid bainhacId,Guid danhSachPhatId)
        {
            try
            {
                ResultModel result = await _danhSachPhatServices.DeleteDanhSachPhatBaiNhac(bainhacId ,danhSachPhatId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatedanhsachphat")]
        public async Task<IActionResult> UpdateDanhSachPhat(danhSachPhatModal modal)
        {
            try
            {
                ResultModel result = await _danhSachPhatServices.UpdateDanhSachPhat(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
