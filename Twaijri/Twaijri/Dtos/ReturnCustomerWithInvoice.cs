namespace Twaijri.Dtos
{
    public class ReturnCustomerWithInvoice
    {
        public string? CustomerName { get; set; }
        public string? PhoneNumber { get; set; }
        public ICollection<InvoiceForReturnDto>? Invoices { get; set; }
    }
}
