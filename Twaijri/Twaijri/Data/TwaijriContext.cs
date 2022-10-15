using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Twaijri.Models;

namespace Twaijri.Data
{
    public class TwaijriContext : DbContext
    {
        public TwaijriContext (DbContextOptions<TwaijriContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Twaijri.Models.Invoice> Invoices { get; set; }

    }
}
