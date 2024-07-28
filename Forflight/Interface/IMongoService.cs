using Forflight.Model;
using MongoDB.Bson;

namespace Forflight.Interface;

public interface IMongoService
{
    Task<List<UserActivity>> GetUserActivitiesAsync(string userId);
    Task InsertUserActivityAsync(string userId, string activity);
}