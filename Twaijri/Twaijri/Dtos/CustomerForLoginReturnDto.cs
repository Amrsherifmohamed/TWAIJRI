using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MafiaApp.API.Dtos
{
    public class CustomerForLoginReturnDto
    {
        public string ?CustomerName { get; set; }
        public string ?PhoneNumber { get; set; }
        public int ? CustomerId { get; set; }   
    }
}