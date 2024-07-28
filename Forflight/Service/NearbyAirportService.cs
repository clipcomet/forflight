using System;
using System.Collections.Generic;
using Forflight.Interface;
using Forflight.Model;

namespace Forflight.Service
{
    public class NearbyAirportService : INearbyAirportService
    {
        private static readonly Dictionary<string, string> NearbyAirportMap = new Dictionary<string, string>
        {
            { "EKHG", "EKKA" },
            { "EKST", "EKOD" },
            { "EKVH", "EKYT" }
        };

        private static readonly List<AirportModel> Airports = new List<AirportModel>
        {
            new AirportModel { Icao = "EKKA", Latitude = 56.2975, Longitude = 9.1246 },
            new AirportModel { Icao = "EKOD", Latitude = 55.4767, Longitude = 10.3300 },
            new AirportModel { Icao = "EKYT", Latitude = 57.0928, Longitude = 9.8492 }
        };

        public string GetNearbyAirportCode(string icao)
        {
            if (NearbyAirportMap.ContainsKey(icao))
            {
                return NearbyAirportMap[icao];
            }
            return icao;
        }

        public string GetNearbyAirportCodeByDistance(string icao, double lat, double lon) // just added this function for a bit of fun, to do a bit more with the backend
        {
            if (NearbyAirportMap.ContainsKey(icao))
            {
                return NearbyAirportMap[icao];
            }

            string nearestIcao = icao;
            double nearestDistance = double.MaxValue;

            foreach (var airport in Airports)
            {
                double distance = CalculateDistance(lat, lon, airport.Latitude, airport.Longitude);
                if (distance < nearestDistance)
                {
                    nearestDistance = distance;
                    nearestIcao = airport.Icao;
                }
            }

            return nearestIcao;
        }

        private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371; // Radius of the Earth in kilometers ish, i just picked a spot but im aware the eatrh is not a perfect sphere
            double dLat = DegreesToRadians(lat2 - lat1);
            double dLon = DegreesToRadians(lon2 - lon1);
            double a =
                Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(DegreesToRadians(lat1)) * Math.Cos(DegreesToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c; // Distance in kilometers
        }

        private double DegreesToRadians(double degrees)
        {
            return degrees * (Math.PI / 180);
        }
    }
}
