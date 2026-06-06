using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Models.Tables
{
    public class Poster
    {
        public int Id {get; set;}
        public string PngLink {get; set;} = null!;
        public string JsonLink {get; set;} = null!;
    }
}