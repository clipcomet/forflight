import { Component, Input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Forecast, ForecastCondition } from '../services/weather-response.model';
import { WeatherUtils } from '../shared/weather-utils';

@Component({
  selector: 'app-taf',
  templateUrl: './taf.component.html',
  styleUrls: ['./taf.component.scss']
})
export class TafComponent {
  @Input() tafData: Forecast | undefined;
  @Input() standalone: boolean = true;
  icaoCode: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getTaf() {
    if (this.icaoCode) {
      this.tafData = undefined;
      this.isLoading = true;
      this.weatherService.getWeather("weather/report", this.icaoCode).subscribe(
        data => {
          this.tafData = data.report.forecast;
          this.isLoading = false;
        },
        error => {
          console.error("Error fetching TAF data:", error);
          this.isLoading = false;
        }
      );
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Date unavailable';
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  formatTime(dateString: string | undefined): string {
    if (!dateString) return 'Time unavailable';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' });
  }

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const issued = new Date(dateString);
    const diffMinutes = Math.floor((now.getTime() - issued.getTime()) / 60000);
    return `${diffMinutes}m ago`;
  }

  formatWind(wind: any): string {
    return WeatherUtils.formatWind(wind);
  }

  formatClouds(cloudLayers: any[]): string {
    if (!cloudLayers || cloudLayers.length === 0) return 'No cloud information available';
    return WeatherUtils.formatClouds(cloudLayers);
  }

  formatForecastPeriod(condition: ForecastCondition): string {
    const wind = WeatherUtils.formatWind(condition.wind);
    const clouds = this.formatClouds(condition.cloudLayers);
    const visibility = condition.visibility?.distanceSm !== undefined 
      ? `${condition.visibility.distanceSm} SM`
      : 'Visibility information unavailable';
    
    return `${wind}, Visibility: ${visibility}, ${clouds}`;
  }
  celsiusToFahrenheit(celsius: number): number { // dont know if its Fahrenheit or celsius people that use it most so i did both
    return WeatherUtils.celsiusToFahrenheit(celsius);
  }
}