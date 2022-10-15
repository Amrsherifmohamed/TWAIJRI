using Twaijri.Models;

namespace Twaijri.Data
{
    public interface IAuthRepository
    {
        Task<Customer> Register(Customer user, string password);
        Task<Customer> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
