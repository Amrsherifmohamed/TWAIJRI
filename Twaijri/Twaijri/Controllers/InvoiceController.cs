using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Resturant.Core.Common;
using Resturant.Core.Interfaces;
using Twaijri.Data.Invoice;
using Twaijri.Data.User;
using Twaijri.Dtos;

namespace Twaijri.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _services;
        public IResponseDTO _response;

        public InvoiceController(IInvoiceService service, IResponseDTO responseDTO)
        {
            _services = service;
            _response = responseDTO;
        }
        [HttpGet]
        public PaginationResult<InvoiceForReturnDto> GetAllCustomer([FromQuery] BaseFilterDto filterDto)
        {
            var AllInvoice = _services.GetAllInvoice(filterDto);
            return AllInvoice;
        }

        [HttpPost]
        public async Task<IResponseDTO> CreateInvoice(InvoiceForCreateDto options)
        {
            _response = await _services.createInvoice(options);
            return _response;
        }
        [HttpDelete("{id}")]
        public async Task<IResponseDTO> DeleteInvoice([FromRoute] int id)
        {
            _response = await _services.DeleteInvoice(id);
            return _response;
        }
        [HttpPut("{id}")]
        public async Task<IResponseDTO> UpdateInvoice([FromRoute] int id,InvoiceForCreateDto options)
        {
            _response = await _services.updateInvoice(id, options);
            return _response;
        }

        [HttpGet("GetOneInvoice/{id}")]
        public async Task<ActionResult<InvoiceForReturnDto>> GetOneCustomer([FromRoute] int id)
        {
            var Invoice = await _services.GetOneInvoice(id);
            if (Invoice == null)
            {
                return NoContent();
            }
            return Ok(Invoice);
        }
    }
}
