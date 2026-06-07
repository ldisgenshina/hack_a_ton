using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Domain.Contracts.Request;
using backend.Domain.Models;
using backend.Midleware.Interfaces;
using backend.Midleware.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/poster")]
    public class PosterController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public PosterController(IStorageService storageService)
        {
            _storageService = storageService;
        }


        [HttpPost]
        public async Task<IActionResult> PostNewPoster([FromBody] GetPostCanvasRequest request)
        {
            try
            {
                string? id = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _storageService.SaveCanvas(request);
                return Ok();
            }
            catch(Exception ex)
            {
                if(ex is ApiException apiEx)
                {
                    int statusCode = apiEx.StatusCode;
                    return StatusCode(statusCode, apiEx.Info);
                }
                return StatusCode(500, "неожиданная ошибка сервера");
            }
        }
        [HttpGet]
        [Route("id")]
        public async Task<IActionResult> GetPosterById(int posterId)
        {
            try
            {
                //string? id = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _storageService.SendCanvas(posterId);
                return Ok();
            }
            catch(Exception ex)
            {
                if(ex is ApiException apiEx)
                {
                    int statusCode = apiEx.StatusCode;
                    return StatusCode(statusCode, apiEx.Info);
                }
                return StatusCode(500, "неожиданная ошибка сервера");
            }
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetListPosters([FromQuery] PlaginationMeta plagination)
        {
            try
            {
                string? id = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _storageService.SendListCanvas(plagination);
                return Ok();
            }
            catch(Exception ex)
            {
                if(ex is ApiException apiEx)
                {
                    int statusCode = apiEx.StatusCode;
                    return StatusCode(statusCode, apiEx.Info);
                }
                return StatusCode(500, "неожиданная ошибка сервера");
            }
        }
        [HttpGet]
        [Route("android/{id}")]
        public async Task<IActionResult> SendPosterToAndroid()
        {
            try
            {
                string? id = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if(!int.TryParse(id, out int deviceId))
                    return StatusCode(401, "id устройства не распознан");
                var response = await _storageService.SendImagesToAndroid(deviceId);
                return Ok(response);
            }
            catch(Exception ex)
            {
                if(ex is ApiException apiEx)
                {
                    int statusCode = apiEx.StatusCode;
                    return StatusCode(statusCode, apiEx.Info);
                }
                return StatusCode(500, "Неожиданная ошибка сервера");
            }
        }
    }
}