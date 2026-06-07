using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Contracts.Request
{
    public class CreateEmployeeRequest
    {
        public string Login {get; set;} = null!;
        public string Password {get; set;} = null!;
    }
}