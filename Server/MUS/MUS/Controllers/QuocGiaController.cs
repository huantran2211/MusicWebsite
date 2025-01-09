using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuocGiaController : ControllerBase
    {
        public readonly IQuocGiaServices _quocGiaServices;
        public QuocGiaController(IQuocGiaServices quocGiaServices)
        {
            _quocGiaServices = quocGiaServices;
        }
        [HttpGet("getallquocgia")]
       public async Task<IActionResult> GetAllQuocGia()
        {
            try
            {
                List<QuocGiaDTO> result = await _quocGiaServices.GetAllQuocGia();
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
