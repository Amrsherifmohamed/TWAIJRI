using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Resturant.Core.Common;
using Resturant.Core.Interfaces;
using Twaijri.Data.User;
using Twaijri.Dtos;

namespace Twaijri.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _services;
        public IResponseDTO _response;

        public CustomerController(ICustomerService service, IResponseDTO responseDTO)
        {
            _services = service;
            _response = responseDTO;
        }
        [HttpGet]
        public PaginationResult<ReturnCustomerDto> GetAllCustomer([FromQuery] BaseFilterDto filterDto)
        {
            var AllCustomer = _services.GetAllCustomer(filterDto);
            return AllCustomer;
        }
        [HttpGet("GetOneCustomer/{id}")]
        public async Task<ActionResult<ReturnCustomerDto>> GetOneCustomer([FromRoute] int id)
        {
            var Customer = await _services.GetOneCustomer(id);
            if (Customer == null)
            {
                return NoContent();
            }
            return Ok(Customer);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnCustomerWithInvoice>> GetOneCustomerWithInvoice([FromRoute] int id)
        {
            var CustomerWithInvoce = await _services.GetOneCustomerWithInvoice(id);
            if (CustomerWithInvoce == null)
            {
                return NoContent();
            }
            return Ok(CustomerWithInvoce);
        }

        [HttpPut("{id}")]
        public async Task<IResponseDTO> UpdateCustomer([FromRoute] int id, ReturnCustomerDto UpdateCustomer)
        {
            _response = await _services.UpdateCustomer(id, UpdateCustomer);
            return _response;
        }

        [HttpDelete("{id}")]
        public async Task<IResponseDTO> DeleteCustomer([FromRoute] int id)
        {
            _response = await _services.DeleteCustomer(id);
            return _response;
        }

    }
}
