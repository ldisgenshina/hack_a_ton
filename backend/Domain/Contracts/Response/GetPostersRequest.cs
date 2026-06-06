using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Contracts.Response
{
    public class GetPostersResponse
    {
        public required List<byte[]> Images {get; set;}
    }
}