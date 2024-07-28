using Forflight.Interface;
using Forflight.Model;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Forflight.Controller;

[ApiController]
[Route("user")] // [Route("[controller]")] // static or dynamic routing 
public class UserController : ControllerBase
{
    private readonly IMongoService _mongoService;
    
    public UserController(IMongoService mongoService)
    {
        _mongoService = mongoService;
    }
    
    [HttpGet("activity")] // I'm not entirely sure how you plan to retrieve user information—whether through login or session cookies. My current approach involves logging in the backend each time a user makes a request to the Weather controller, then sending the data to a database. I use JWT tokens and MongoDB for this purpose. We can discuss other methods during the meeting.
    public async Task<IActionResult> GetWeatherReport()
    {
        /* Will not work without it actively implemented so i use dummy data
        var token = HttpContext.Request.Headers["Authorization"].ToString().Split(' ').Last();
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "id");
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = userIdClaim.Value;
        */
        var userId = "1234"; // dummy data
        var userActivities = await _mongoService.GetUserActivitiesAsync(userId);

        if (userActivities == null || userActivities.Count == 0)
        {
            return NotFound("No activities found for this user.");
        }

        var jsonResult = new JsonResult(userActivities);

        return Ok(jsonResult);
    }
    

}