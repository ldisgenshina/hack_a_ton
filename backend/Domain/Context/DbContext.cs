using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Enums;
using backend.Domain.Interfaces;
using backend.Domain.Models.Tables;
using LiteDB;
using Microsoft.Extensions.Configuration;

namespace backend.Domain.Context
{
    public class DbContext
    {
        public readonly string PathToDatabase;
        private readonly IConfiguration _configuration;
      
        // Как использовать этот класс?
        // using var db = new LiteDatabase(DbContext.PathToDatabase);
        // var employees = db.GetCollection<Employee>("emplyees");
        // employees.Insert(new Employee {...})
        // После Insert() Изменения уже вступили в силу
        // Список таблиц:
        // emplyees
        // posters
        // devices
        // devicePosters

        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            PathToDatabase = _configuration["PathToDatabase"] ?? "backend/Domain/Database.Database.db";
            InisilizeDatabase(PathToDatabase);
        }



        private static void InisilizeDatabase(string pathToDatabase)
        {
            var directory = Path.GetDirectoryName(pathToDatabase);
        
            if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
                Console.WriteLine($"Создана директория для БД: {directory}");
            }

            using(LiteDatabase db = new LiteDatabase(pathToDatabase))
            {
                var employees = db.GetCollection<Employee>("emplyees");
                var posters = db.GetCollection<Poster>("posters");
                var devices = db.GetCollection<Device>("devices");
                var devicePosters = db.GetCollection<DevicePoster>("devicePosters");

                employees.EnsureIndex(e => e.Login);

                devicePosters.EnsureIndex(dp => dp.DeviceId);
                devicePosters.EnsureIndex(dp => dp.PosterId);
                
                employees.Insert(new Employee(){Id = 1, Login = "dima", Password = "123"});
                employees.Insert(new Employee(){Id = 2, Login = "sergay", Password = "231"});
                employees.Insert(new Employee(){Id = 3, Login = "alexey", Password = "321"});

                db.Commit();
            }
        }
    }

}