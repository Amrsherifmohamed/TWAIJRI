using Twaijri.Helper.Enums;
using Twaijri.Data;
namespace Twaijri.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }
        public Customer customer { get; set; }
        public DateTime InvoiceDate{ get; set; }
        public decimal Value{ get; set; }
        public State? State { get; set; }
    }
}
