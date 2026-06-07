using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Domain.Contracts.Response
{
    public class GetPostersResponse
    {
        public required List<byte[]> Images {get; set;}
        public required PlaginationMeta Plagination {get; set;}
    }
}