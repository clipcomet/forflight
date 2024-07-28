import { Wind, CloudLayer } from '../services/weather-response.model';


// mostly added becuase i take it not all users know how to read it. me include intill i looked it up. so i made some guestimates from games i have played :P 
export class WeatherUtils {
    static formatWindDirection(direction: number | undefined): string {
        if (direction === undefined) return 'Unknown';
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(direction / 22.5) % 16;
        return directions[index];
      }
    
      static formatWind(wind: any): string {
        if (!wind || wind.direction === undefined || wind.speedKts === undefined) {
          return 'Wind information unavailable';
        }
        const direction = this.formatWindDirection(wind.direction);
        const description = this.getWindDescription(wind.speedKts);
        return `${direction} ${wind.direction}° at ${wind.speedKts} kts (${description})`;
      }

  static getWindDescription(speed: number): string {
    if (speed < 1) return 'Calm';
    if (speed < 4) return 'Light Air';
    if (speed < 8) return 'Light Breeze';
    if (speed < 13) return 'Gentle Breeze';
    if (speed < 19) return 'Moderate Breeze';
    if (speed < 25) return 'Fresh Breeze';
    if (speed < 32) return 'Strong Breeze';
    if (speed < 39) return 'Near Gale';
    if (speed < 47) return 'Gale';
    if (speed < 55) return 'Severe Gale';
    if (speed < 64) return 'Storm';
    if (speed < 73) return 'Violent Storm';
    return 'Hurricane Force';
  }

  static getCloudCoverageDescription(coverage: string): string {
    switch (coverage.toLowerCase()) {
      case 'skc': return 'Sky Clear';
      case 'few': return 'Few';
      case 'sct': return 'Scattered';
      case 'bkn': return 'Broken';
      case 'ovc': return 'Overcast';
      default: return coverage;
    }
  }

  static formatClouds(cloudLayers: CloudLayer[]): string {
    if (cloudLayers.length === 0) return 'Clear';
    return cloudLayers.map(layer => {
      const coverage = this.getCloudCoverageDescription(layer.coverage);
      return `${coverage} at ${layer.altitudeFt}'`;
    }).join(', ');
  }

  static celsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9/5) + 32);
  }

  static calculateHumidity(tempC: number, dewpointC: number): number {
    return Math.round(100 * (Math.exp((17.625 * dewpointC) / (243.04 + dewpointC)) / Math.exp((17.625 * tempC) / (243.04 + tempC))));
  }
}