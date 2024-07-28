namespace Forflight.Interface;

public interface INearbyAirportService
{
    string GetNearbyAirportCode(string icao);
    string GetNearbyAirportCodeByDistance(string icao, double lat, double lon);
}