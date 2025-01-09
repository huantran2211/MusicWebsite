using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class UserServices : IUserServices
    {
        public readonly IUserRepository _userRepository;

        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ResultModel> DeleteUser(Guid Id)
        {
            return await _userRepository.DeleteUser(Id);
        }

        public async Task<List<UserDTO>> GetAllUser()
        {
            return await _userRepository.GetAllUser();
        }

        public async Task<UserDTO> GetUserById(Guid id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task<LoginDTO> Login(LoginModal modal)
        {
            return await _userRepository.Login(modal);
        }

        public async Task<ResultModel> ResetPassword(Guid id, string oldPassword, string newPasword)
        {
            return await _userRepository.ResetPassword(id, oldPassword, newPasword); 
        }

        public async Task<ResultModel> Resgister(RegisterModal modal)
        {
            return await _userRepository.Resgister(modal);
        }

        public async Task<ResultModel> UpdateUser(UserModal modal)
        {
            return await _userRepository.UpdateUser(modal);
        }
    }
}
