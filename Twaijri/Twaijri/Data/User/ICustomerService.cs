using Microsoft.EntityFrameworkCore;
using Resturant.Core.Common;
using Resturant.Core.Interfaces;
using Twaijri.Dtos;
using Twaijri.Models;

namespace Twaijri.Data.User
{
    public interface ICustomerService
    {
        Task<ReturnCustomerDto> GetOneCustomer(int id);
        PaginationResult<ReturnCustomerDto> GetAllCustomer(BaseFilterDto filterDto);
        Task<IResponseDTO> UpdateCustomer(int id,ReturnCustomerDto user);
        Task<IResponseDTO> DeleteCustomer(int id);
        Task<ReturnCustomerWithInvoice> GetOneCustomerWithInvoice(int id);
    }
}
