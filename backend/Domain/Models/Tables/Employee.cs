using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;

namespace backend.Domain.Models.Tables
{
    public class Employee : IModel
    {
        public int Id {get; set;}
        public string Login {get; set;} = null!;
        public string Password {get; set;} = null!;
    }
}