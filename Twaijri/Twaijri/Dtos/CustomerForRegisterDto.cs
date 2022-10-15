using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace MafiaApp.API.Dtos
{
    public class CustomerForRegisterDto
    {
        [Required]
        public string ?CustomerName { get; set; }
        [Required]
        public string ?PhoneNumber { get; set; }
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="The Password Should not be less than four Digiat and not more than 8 digait")]
        public string ?password { get; set; }
    
    }
}