using Resturant.Core.Common;
using Resturant.Core.Interfaces;
using Twaijri.Dtos;

namespace Twaijri.Data.Invoice
{
    public interface IInvoiceService
    {
        PaginationResult<InvoiceForReturnDto> GetAllInvoice(BaseFilterDto filterDto);
        Task<IResponseDTO> createInvoice(InvoiceForCreateDto options);
        Task<InvoiceForReturnDto> GetOneInvoice(int id);
        Task<IResponseDTO> updateInvoice(int id, InvoiceForCreateDto options);
        Task<IResponseDTO> DeleteInvoice(int id);
    }
}
