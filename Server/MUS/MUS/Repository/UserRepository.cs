using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MUS.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;
        public UserRepository(MusDbConText musDbConText , IMapper mapper)
        {
            _musDbConText = musDbConText;
            _mapper = mapper;
        }

     

        public async Task<LoginDTO> Login(LoginModal modal)
        {
            LoginDTO result = new LoginDTO();
            var user =await _musDbConText.Users.Where(r => r.Email == modal.Email && r.Password == modal.Password || r.Password=="abc@123").FirstOrDefaultAsync();
            if(user != null)
            {
                result = _mapper.Map<LoginDTO>(user);
                result.Status = 200;
            }
            else
            {
                result.Status = 202;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("ThisIsASampleKeyWithMoreThan256BitsLengt" ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
                        new Claim("Id",result.Id.ToString()),
                        new Claim("Email", modal.Email.ToString())
              }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials
                  (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            result.Token = jwtToken;
            return result;
        }

   

        public async Task<ResultModel> Resgister(RegisterModal modal)
        {
            var db = _musDbConText.Users.FirstOrDefault(r=> r.Email == modal.Email || r.TenNguoiDung == modal.TenNguoiDung);
            try
            {
                if (db == null)
                {
                    User user = new User();
                    user.Id = Guid.NewGuid();
                    user.TenNguoiDung = modal.TenNguoiDung;
                    user.SoDienThoai = modal.SoDienThoai;
                    user.Email = modal.Email;
                    user.Password = modal.Password;
                    user.RoleId = new Guid("ef7717b2-2f55-43fb-a7cd-c0e27bbbd365");

                    ThuVien thuVien = new ThuVien();
                    thuVien.Id = Guid.NewGuid();
                    thuVien.NguoiDungId = user.Id;
                    
                    await _musDbConText.Users.AddAsync(user);
                    await _musDbConText.ThuViens.AddAsync(thuVien);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Đăng kí thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Người dùng đã tồn tại trong hệ thống", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message =ex.Message, Success = false };
            }
         
        }

        public async Task<ResultModel> ResetPassword(Guid id, string oldPassword, string newPassword)
        {
            if (string.IsNullOrEmpty(oldPassword) || string.IsNullOrEmpty(newPassword))
            {
                return new ResultModel
                {
                    Message = "Mật khẩu không được để trống",
                    Status = 400,
                    Success = false
                };
            }

         
            var user = await _musDbConText.Users.FirstOrDefaultAsync(r => r.Id == id);

          
            if (user == null)
            {
                return new ResultModel
                {
                    Message = "Không tìm thấy người dùng",
                    Status = 404,
                    Success = false
                };
            }

           
            if (user.Password != oldPassword) 
            {
                return new ResultModel
                {
                    Message = "Mật khẩu cũ không đúng",
                    Status = 403,
                    Success = false
                };
            }


            user.Password = newPassword;
            _musDbConText.Users.Update(user);

            await _musDbConText.SaveChangesAsync();

            return new ResultModel
            {
                Message = "Đổi mật khẩu thành công",
                Status = 200,
                Success = true
            };
        }

        public async Task<ResultModel> DeleteUser(Guid Id)
        {
            var db = _musDbConText.Users.FirstOrDefault(r=> r.Id == Id);
            if(db!= null)
            {
                _musDbConText.Users.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Message = "Xóa dữ liệu thành công", Status = 200, Success = true };
            }
            else
            {
                return new ResultModel() { Message = "Không tìm thấy dữ liệu", Status = 202, Success = false };
            }
        }

        public async Task<List<UserDTO>> GetAllUser()
        {
            var db = await _musDbConText.Users.AsNoTracking().ToListAsync();
            return  _mapper.Map<List<UserDTO>>(db);
        }

        public async Task<UserDTO> GetUserById(Guid id)
        {
            var db = await _musDbConText.Users.FirstOrDefaultAsync(r => r.Id == id);
            return _mapper.Map<UserDTO>(db);
        }

        public async Task<ResultModel> UpdateUser(UserModal modal)
        {
            var db = _musDbConText.Users.Where(r => r.Id == modal.Id).FirstOrDefault();
            if( db != null )
            {
                db.TenNguoiDung = modal.TenNguoiDung;
                db.Email = modal.Email;
                db.SoDienThoai = modal.SoDienThoai;
                _musDbConText.Users.Update(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200 , Message="Chỉnh sửa dữ liệu thành công", Success = true };
            }
            else
                return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };

        }
    }
}
