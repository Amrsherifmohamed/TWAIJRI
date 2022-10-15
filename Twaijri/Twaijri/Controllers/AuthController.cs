using MafiaApp.API.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Twaijri.Data;
using Twaijri.Models;
using Mapster;

namespace Twaijri.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(CustomerForLoginDto userForLoginDto)
        {
            var user = await _repo.Login(userForLoginDto.CustomerName.ToLower(), userForLoginDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,user.CustomerId.ToString()),
                new Claim(ClaimTypes.Name,user.CustomerName!)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var usertoreturn = user.Adapt<CustomerForLoginReturnDto>();

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user = usertoreturn
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CustomerForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.CustomerName = userForRegisterDto.CustomerName.ToLower();
            if (await _repo.UserExists(userForRegisterDto.CustomerName))
            {              
                return BadRequest();
            }
            var userToCreate = new Customer
            {
                CustomerName = userForRegisterDto.CustomerName,
                PhoneNumber = userForRegisterDto.PhoneNumber
            };

            var CreatedUser = await _repo.Register(userToCreate, userForRegisterDto.password);
            return StatusCode(201);
        }
    }
}
