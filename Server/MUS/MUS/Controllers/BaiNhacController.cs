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
    public class BaiNhacController : ControllerBase
    {
        private readonly IBaiNhacServices _baiNhacServices;
        public BaiNhacController(IBaiNhacServices baiNhacServices)
        {
            _baiNhacServices = baiNhacServices;
        }

        [HttpGet("getallbainhac")]
        public async Task<IActionResult> GetAllBaiNhac()
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetAllBaiNhac();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gettop5bainhacnhieuluotxem")]
        public async Task<IActionResult> GetTop5BaiNhacNhieuLuotxem()
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetTop5BaiNhacNhieuLuotXem();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gettop100bainhacnhieuluotxem")]
        public async Task<IActionResult> GetTop100BaiNhacNhieuLuotxem()
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetTop100BaiNhacNgheNhieuNhat();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("gettop5bainhacmoiphathanh")]
        public async Task<IActionResult> GetTop5BaiNhacMoiPhathanh()
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetTop5BaiNhacMoiPhatHanh();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getbainhacbyid")]
        public async Task<IActionResult> GetBaiNhacById(Guid Id)
        {
            try
            {
                BaiNhacDTO result = await _baiNhacServices.GetBaiNhacById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbainhacbyalbumid")]
        public async Task<IActionResult> GetBaiNhacByAlbumId(Guid albumId)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetBaiNhacByAlBumId(albumId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbainhacbynhacsiid")]
        public async Task<IActionResult> GetBaiNhacByNhacSiId(Guid nhacSiId)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetBaiNhacByNhacSiId(nhacSiId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbainhacbytheloaiid")]
        public async Task<IActionResult> GetBaiNhacByTheLoaiId(Guid theloaiid)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetBainhacByTheLoaiId(theloaiid);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbainhacbychudeid")]
        public async Task<IActionResult> GetBaiNhacByChuDeId(Guid chudeid)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetBaiNhacByChuDeid(chudeid);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbainhacbyquocgiaid")]
        public async Task<IActionResult> GetBaiNhacByQuocGiaId(int quocgiaid)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetBaiNhacByQuocGiaId(quocgiaid);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbainhacbytamtrangid")]
        public async Task<IActionResult> GetBaiNhacByTamTrangId(Guid tamTrangId)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GetBaiNhacByTamTrangid(tamTrangId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addbainhac")]
        public async Task<IActionResult> AddChuDe([FromForm] BaiNhacModel modal)
        {
            try
            {
                ResultModel result = await _baiNhacServices.AddBaiNhac(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("updatebainhac")]
        public async Task<IActionResult> UpdateBaiNhac([FromForm]  UpdateBaiNhacModel modal)
        {
            try
            {
                ResultModel result = await _baiNhacServices.UpdateBaiNhac(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateview")]
        public async Task<IActionResult> UpdateView(Guid id)
        {
            try
            {
                ResultModel result = await _baiNhacServices.UpdateView(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletebainhac")]
        public async Task<IActionResult> Deletebainhac(Guid id)
        {
            try
            {
                ResultModel result = await _baiNhacServices.DeleteBaiNhac(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("goiybaihat")]
        public async Task<IActionResult> GoiYBaiHat(Guid userId)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.GoiYbaiNhacByUserId(userId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("timkiembaihat/keyword")]
        public async Task<IActionResult> TimKiemBaiHat(string keyword)
        {
            try
            {
                List<BaiNhacDTO> result = await _baiNhacServices.TimKiemBaiHat(keyword);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
