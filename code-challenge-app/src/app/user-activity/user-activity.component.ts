import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { UserActivity } from '../services/user-activity.model';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  activities: UserActivity[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getUserActivity();
  }

  getUserActivity() {
    this.isLoading = true;
    this.errorMessage = null;
    this.weatherService.getUserActivity().subscribe(
      data => {
        console.log("data",data);
        this.activities = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user activity:', error);
        this.errorMessage = 'An error occurred while fetching user activity. Please try again later.';
        this.isLoading = false;
      }
    );
  }
}