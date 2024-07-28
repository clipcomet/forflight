using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Forflight.Interface;

namespace Forflight.Controller
{
    [ApiController]
    [Route("weather")] // [Route("[controller]")] // static or dynamic routing 
    public class WeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly string _weatherApiUrl;
        private readonly IMongoService _mongoService;
        

        public WeatherController(HttpClient httpClient, IMemoryCache cache,IConfiguration configuration,IMongoService mongoService)
        {
            _httpClient = httpClient;
            _cache = cache;
            _weatherApiUrl = configuration["ApiSettings:WeatherApiUrl"];
            _mongoService = mongoService;
        } 



        private string GetNearbyAirportCode(string icao)
        {
            if (NearbyAirportMap.ContainsKey(icao))
            {
                return NearbyAirportMap[icao];
            }
            return icao;
        }
        
        

        [HttpGet("report/{icao}")]
        public async Task<IActionResult> GetWeatherReport(string icao)
        {
            // No token system so i use dummy data to simitare storing user activitys
            _mongoService.InsertUserActivityAsync("1234",icao);
            
            icao = GetNearbyAirportCode(icao);

            if (!_cache.TryGetValue(icao, out string cachedReport))
            {
                await Task.Delay(2000); // Simulate delay

                var request = new HttpRequestMessage(HttpMethod.Get, $"{_weatherApiUrl}{icao}");
                request.Headers.Add("x-foreflight-odense", "true");

                var response = await _httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    cachedReport = await response.Content.ReadAsStringAsync();
                    _cache.Set(icao, cachedReport, TimeSpan.FromMinutes(30));
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }

            return Ok(cachedReport);
        }
        // Endpoint that tries to find the closes airport my distence. just for a bit of fun
        /*
        [HttpGet("report/{icao}")]
        public async Task<IActionResult> GetWeatherReport(string icao)
        {
            

            if (!_cache.TryGetValue(icao, out string cachedReport))
            {
                await Task.Delay(2000); // Simulate delay

                var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.foreflight.com/weather/report/{icao}");
                request.Headers.Add("x-foreflight-odense", "true");

                var response = await _httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    cachedReport = await response.Content.ReadAsStringAsync();
                    _cache.Set(icao, cachedReport, TimeSpan.FromMinutes(30));

                    // Extract latitude and longitude from the JSON response
                    var jsonResponse = JObject.Parse(cachedReport);
                    double lat = jsonResponse["report"]["conditions"]["lat"].Value<double>();
                    double lon = jsonResponse["report"]["conditions"]["lon"].Value<double>();

                    // Check if we need to use a nearby airport, if its on the lsit it will chouse itself, or we could just look to see if there was any weatherdata at all.
                    string nearestIcao = _nearbyAirportService.GetNearbyAirportCodeByDistance(icao, lat, lon);

                    if (nearestIcao != icao)
                    {
                        // Fetch the report for the nearest airport
                        request = new HttpRequestMessage(HttpMethod.Get, $"https://api.foreflight.com/weather/report/{nearestIcao}");
                        request.Headers.Add("x-foreflight-odense", "true");

                        response = await _httpClient.SendAsync(request);

                        if (response.IsSuccessStatusCode)
                        {
                            cachedReport = await response.Content.ReadAsStringAsync();
                            _cache.Set(nearestIcao, cachedReport, TimeSpan.FromMinutes(30));
                        }
                        else
                        {
                            return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                        }
                    }
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }

            return Ok(cachedReport);
        }
      */
        private static readonly Dictionary<string, string> NearbyAirportMap = new Dictionary<string, string>
        {
            { "EKHG", "EKKA" },
            { "EKST", "EKOD" },
            { "EKVH", "EKYT" }
        };
    }
}
