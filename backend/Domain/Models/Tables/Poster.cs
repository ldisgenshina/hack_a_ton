using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;

namespace backend.Domain.Models.Tables
{
    public class Poster : IModel
    {
        public int Id {get; set;}
        public string PngLink {get; set;} = null!;
        public string JsonLink {get; set;} = null!;
        public string Duration { get; set; } = null!;
    }
}