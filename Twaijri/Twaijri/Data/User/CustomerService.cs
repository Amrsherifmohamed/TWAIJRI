using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Resturant.Core.Common;
using Resturant.Core.Interfaces;
using Twaijri.Dtos;

namespace Twaijri.Data.User
{
    public class CustomerService : ICustomerService
    {
        private readonly TwaijriContext _context;
        private readonly IResponseDTO _response;

        public CustomerService(TwaijriContext context, IResponseDTO response)
        {
            _context = context;
            _response = response;
        }
        public async Task<IResponseDTO> DeleteCustomer(int id)
        {
            try
            {
                var Customer = await _context.Customers.FindAsync(id);
                if (Customer == null)
                {
                    _response.IsPassed = false;
                    _response.Message = "Invalid object Id";
                    return _response;

                }
                // Delete From Database
                _context.Customers.Remove(Customer);
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

        public PaginationResult<ReturnCustomerDto> GetAllCustomer(BaseFilterDto filterDto)
        {
            var paginationResult = _context.Customers.Paginate(filterDto.PageSize, filterDto.PageNumber);
            var dataList = paginationResult.list.Adapt<List<ReturnCustomerDto>>();
            return new PaginationResult<ReturnCustomerDto>(dataList, paginationResult.total);
        }

        public async Task<ReturnCustomerDto> GetOneCustomer(int id)
        {
            var Customer = await _context.Customers.FirstOrDefaultAsync(C=>C.CustomerId == id);
            if (Customer == null) return null;
            var CustomerToReturn = Customer.Adapt<ReturnCustomerDto>();
            return CustomerToReturn;
        }

        public async Task<ReturnCustomerWithInvoice> GetOneCustomerWithInvoice(int id)
        {
            var Customer = await _context.Customers.Include(c => c.Invoices).FirstOrDefaultAsync(x => x.CustomerId == id);
            if (Customer == null) return null;
            var CustomerToReturn = Customer.Adapt<ReturnCustomerWithInvoice>();
            return CustomerToReturn;
        }

       public async Task<IResponseDTO> UpdateCustomer(int id, ReturnCustomerDto user)
        {
            try { 
                var Customer = await _context.Customers.FindAsync(id);
                if (Customer == null)
                {
                    _response.IsPassed = false;
                    _response.Message = "Invalid object Id";
                    return _response;
                }

                Customer.CustomerName = user?.CustomerName;
                Customer.PhoneNumber = user?.PhoneNumber;

                _context.Customers.Attach(Customer);
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
