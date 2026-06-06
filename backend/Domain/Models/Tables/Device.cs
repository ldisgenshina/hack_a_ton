using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Models.Tables
{
    public class Device
    {
        public int Id {get; set;}
        public string Address {get; set;} = null!;
    }
}