using Twaijri.Helper.Enums;
using static Twaijri.Models.Invoice;

namespace Twaijri.Dtos
{
    public class InvoiceForReturnDto
    {
        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal? Value { get; set; }
        public State? State { get; set; }
    }
    public class InvoiceForCreateDto
    {
        public int CustomerId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Value { get; set; }
        public State state { get; set; }
    }
}
