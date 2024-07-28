import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherReport } from '../services/weather-response.model';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {
  icaoCode: string = '';
  weatherData: WeatherReport | undefined;
  isLoading: boolean = false;
  openSections: { [key: string]: boolean } = {
    metar: true,
    taf: true
  };

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (this.icaoCode) {
      this.weatherData = undefined;
      this.isLoading = true;
      this.weatherService.getWeather("weather/report", this.icaoCode).subscribe(
        data => {
          this.weatherData = data.report;
          this.isLoading = false;
        },
        error => {
          console.error("Error fetching weather data:", error);
          this.isLoading = false;
        }
      );
    }
  }

  toggleSection(section: string) {
    this.openSections[section] = !this.openSections[section];
  }

  isSectionOpen(section: string): boolean {
    return this.openSections[section] || false;
  }
}