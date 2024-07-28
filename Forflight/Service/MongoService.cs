using Forflight.Interface;
using Forflight.Model;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Forflight.Service;

public class MongoService : IMongoService
{
    private readonly IMongoCollection<BsonDocument> _userActivities;

    public MongoService(IMongoClient mongoClient, IConfiguration configuration)
    {
        var databaseName = configuration["MongoSettings:DatabaseName"];
        var database = mongoClient.GetDatabase(databaseName);
        _userActivities = database.GetCollection<BsonDocument>("UserActivities");
    }

    public async Task<List<UserActivity>> GetUserActivitiesAsync(string userId)
    {
        /* Will not work without a database implemented so i use dummy data
        var filter = Builders<BsonDocument>.Filter.Eq("UserId", userId);
        return await _userActivities.Find(filter).ToListAsync();
        */
        return new List<UserActivity>
        {
            new UserActivity { UserId = userId, Activity = "EKHG", Timestamp = DateTime.UtcNow.AddMinutes(-5) },
            new UserActivity { UserId = userId, Activity = "EKGE", Timestamp = DateTime.UtcNow.AddHours(-2) },
            new UserActivity { UserId = userId, Activity = "EKVH", Timestamp = DateTime.UtcNow.AddDays(-1) }
        };
    }
    
    public async Task InsertUserActivityAsync(string userId, string activity)
    {
        /* Will not work without a database implemented so i use dummy data
        var document = new BsonDocument
        {
            { "UserId", userId },
            { "Activity", activity },
            { "Timestamp", DateTime.UtcNow }
        };
        await _userActivities.InsertOneAsync(document);
        */
    }
}