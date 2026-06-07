using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;

namespace backend.Domain.Models.Tables
{
    public class Device : IModel
    {
        public int Id {get; set;}
        public string Address {get; set;} = null!;
    }
}