import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersComponent } from './components/users/users.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ProgressChartComponent } from './components/progress-chart/progress-chart.component';

const initialData =  [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 }
    ],
    totalWorkouts: 2,
    totalMinutes: 75
  },
  {
    id: 2,
    name: 'Jane Smith',
    workouts: [
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 }
    ],
    totalWorkouts: 2,
    totalMinutes: 80
  },
  {
    id: 3,
    name: 'Mike Johnson',
    workouts: [
      { type: 'Yoga', minutes: 50 },
      { type: 'Cycling', minutes: 40 }
    ],
    totalWorkouts: 2,
    totalMinutes: 90
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatTabsModule, AddUserComponent, UsersComponent, ProgressChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health-hustle';
  ngOnInit() {
    this.initializeLocalStorage();
  }

  initializeLocalStorage() {
    if (!localStorage.getItem('workoutData')) {
      localStorage.setItem('workoutData', JSON.stringify(initialData));
    }
  }

   @ViewChild('usersComponent') usersComponent!: UsersComponent;
   @ViewChild('progressChartComponent') progressChartComponent!: ProgressChartComponent;
}
