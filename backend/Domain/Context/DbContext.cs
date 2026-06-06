using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Context
{
    public class DbContext
    {
        private readonly string _pathToDatabase;
        private readonly IConfiguration _configuration;

        

        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _pathToDatabase = configuration["PathToDatabase"] ?? "backend/Domain/Database";
        }
    }

}