using Mapster;
using Microsoft.EntityFrameworkCore;
using Resturant.Core.Common;
using Resturant.Core.Interfaces;
using Twaijri.Dtos;
using Twaijri.Models;

namespace Twaijri.Data.Invoice
{
    public class InvoiceService : IInvoiceService
    {
        private readonly TwaijriContext _context;
        private readonly IResponseDTO _response;

        public InvoiceService(TwaijriContext context, IResponseDTO response)
        {
            _context = context;
            _response = response;
        }
        public async Task<IResponseDTO> createInvoice(InvoiceForCreateDto options)
        {
            try
            {
                var obj = new Twaijri.Models.Invoice()
                {
                    CustomerId = options.CustomerId,
                    Value = options.Value,
                    InvoiceDate = options.InvoiceDate,
                    State = options.state
                };
                await _context.Invoices.AddAsync(obj);
                await _context.SaveChangesAsync();
                _response.IsPassed = true;
                return _response;
            }
            catch (Exception ex)
            {
                _response.Data = null;
                _response.IsPassed = false;
                _response.Errors.Add($"Error: {ex.Message}");
            }

            if (_response.Errors.Count > 0)
            {
                _response.Errors = _response.Errors.Distinct().ToList();
                _response.IsPassed = false;
                _response.Data = null;
                return _response;
            }
            return _response;
        }


        public async Task<InvoiceForReturnDto> GetOneInvoice(int id)
        {
            var Invoices = await _context.Invoices.FirstOrDefaultAsync(C => C.InvoiceId == id);
            if (Invoices == null) return null;
            var InvoicesToReturn = Invoices.Adapt<InvoiceForReturnDto>();
            return InvoicesToReturn;
        }
        public async Task<IResponseDTO> DeleteInvoice(int id)
        {
            try
            {
                var invoice = await _context.Invoices.FindAsync(id);
                if (invoice == null)
                {
                    _response.IsPassed = false;
                    _response.Message = "Invalid object Id";
                    return _response;

                }
                // Delete From Database
                _context.Invoices.Remove(invoice);
                await _context.SaveChangesAsync();
                _response.IsPassed = true;
            }
            catch (Exception ex)
            {
                _response.Data = null;
                _response.IsPassed = false;
                _response.Errors.Add($"Error: {ex.Message}");
            }
            if (_response.Errors.Count > 0)
            {
                _response.Errors = _response.Errors.Distinct().ToList();
                _response.IsPassed = false;
                _response.Data = null;
                return _response;
            }
            return _response;
        }

        public PaginationResult<InvoiceForReturnDto> GetAllInvoice(BaseFilterDto filterDto)
        {
            var paginationResult = _context.Invoices.Paginate(filterDto.PageSize, filterDto.PageNumber);
            var dataList = paginationResult.list.Adapt<List<InvoiceForReturnDto>>();
            return new PaginationResult<InvoiceForReturnDto>(dataList, paginationResult.total);
        }

        public async Task<IResponseDTO> updateInvoice(int id, InvoiceForCreateDto options)
        {
            try
            {
                var invoice = await _context.Invoices.FindAsync(id);
                if (invoice == null)
                {
                    _response.IsPassed = false;
                    _response.Message = "Invalid object Id";
                    return _response;
                }

                invoice.InvoiceDate = options.InvoiceDate;
                invoice.Value = options.Value;
                invoice.State = options.state;
                //invoice.state = options.state;
                invoice.CustomerId = options.CustomerId;

                _context.Invoices.Attach(invoice);
                await _context.SaveChangesAsync();

                _response.IsPassed = true;
                return _response;
            }
            catch (Exception ex)
            {
                _response.Data = null;
                _response.IsPassed = false;
                _response.Errors.Add($"Error: {ex.Message}");
            }

            if (_response.Errors.Count > 0)
            {
                _response.Errors = _response.Errors.Distinct().ToList();
                _response.IsPassed = false;
                _response.Data = null;
                return _response;
            }
            return _response;
        }
    }
}
