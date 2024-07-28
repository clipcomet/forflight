import { Component, Input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Conditions } from '../services/weather-response.model';
import { WeatherUtils } from '../shared/weather-utils';

@Component({
  selector: 'app-metar',
  templateUrl: './metar.component.html',
  styleUrls: ['./metar.component.scss']
})
export class MetarComponent {
  @Input() metarData: Conditions | undefined;
  @Input() standalone: boolean = true;
  icaoCode: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getMetar() {
    if (this.icaoCode) {
      this.metarData = undefined;
      this.isLoading = true;
      this.weatherService.getWeather("weather/report", this.icaoCode).subscribe(
        data => {
          this.metarData = data.report.conditions;
          this.isLoading = false;
        },
        error => {
          console.error("Error fetching METAR data:", error);
          this.isLoading = false;
        }
      );
    }
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
    return WeatherUtils.formatClouds(cloudLayers);
  }

  celsiusToFahrenheit(celsius: number): number {
    return WeatherUtils.celsiusToFahrenheit(celsius);
  }

  calculateHumidity(tempC: number, dewpointC: number): number {
    return WeatherUtils.calculateHumidity(tempC, dewpointC);
  }
}