using Microsoft.EntityFrameworkCore;
using Twaijri.Models;

namespace Twaijri.Data
{
    public class AuthRepository :IAuthRepository
    {
        private readonly TwaijriContext _context;
        public AuthRepository(TwaijriContext context)
        {
            _context = context;
        }
        public async Task<Customer> Register(Customer user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.Customers.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;

        }
        public async Task<Customer?> Login(string username, string password)
        {
            var user = await _context.Customers.FirstOrDefaultAsync(u => u.CustomerName == username);
            if (user == null)
            {
                return null;
            }
            if (!VerifyPasswordHash(password, user.PasswordHash!, user.PasswordSalt!))
            {
                return null;
            }
            return user;
        }
        public async Task<bool> UserExists(string username)
        {
            var userExist = await _context.Customers.AnyAsync(u => u.CustomerName == username);
            if (userExist)
            {
                return true;
            }
            return false;
        }



        /* Create password compine password with salt for create password
         hashed with comination password salt*/
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        // check if password is correct or not 
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var ComputedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < ComputedHash.Length; i++)
                {
                    if (ComputedHash[i] != passwordHash[i])
                    {
                        return false;
                    }

                }
                return true;
            }
        }
    }
}
