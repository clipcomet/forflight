import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent {
  buttons = [
    { label: 'METAR', route: '/weather/metar' },
    { label: 'TAF', route: '/weather/taf' },
    { label: 'Full Report', route: '/weather/full' },
    { label: 'User Activity', route: '/user/activity' }
  ];
}