using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;
using LiteDB;

namespace backend.Domain.Models.Tables
{
    public class DevicePoster : IModel
    {
        [BsonId]
        public string Id {get; set;}
        public int DeviceId {get; set;}
        public int PosterId {get; set;}

        public static string BuildId(int deviceId, int posterId)
        {
            return $"{deviceId}_{posterId}";
        }
    }
}