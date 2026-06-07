using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class PlaginationMeta
    {
        public int Page {get; set;}
        public int Size {get; set;}
        public int TotalAmount {get; set;}
        public int TotalPages {get; set;}
    }
}