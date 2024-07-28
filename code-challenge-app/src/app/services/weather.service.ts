import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherResponse } from './weather-response.model';
import { UserActivity } from './user-activity.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.useLocalApi ? 'https://localhost:44357' : 'https://api.foreflight.com/api/weather/report';
  constructor(private http: HttpClient) {}

  getWeather(endpoint: string,icao: string): Observable<WeatherResponse> {
    console.log("did call the service",environment.useLocalApi);
    return this.http.get<WeatherResponse>(`${this.apiUrl}/${endpoint}/${icao}`);
  }
  getUserActivity(): Observable<UserActivity[]> {
    return this.http.get<any>(`${this.apiUrl}/user/activity`)
      .pipe(
        map(response => response.value.map((item: any) => ({
          UserId: item.userId,
          Activity: item.activity,
          Timestamp: new Date(item.timestamp)
        })))
      );
  }
}