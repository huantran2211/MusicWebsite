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
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        public UserController(IUserServices userServices) { 

            _userServices = userServices;
        }
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
                List<UserDTO> result = await _userServices.GetAllUser();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                UserDTO result = await _userServices.GetUserById(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUsser(Guid Id)
        {
            try
            {
                ResultModel result = await _userServices.DeleteUser(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUsser([FromForm] UserModal modal)
        {
            try
            {
                ResultModel result = await _userServices.UpdateUser(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
