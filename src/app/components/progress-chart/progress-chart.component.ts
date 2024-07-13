import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { User } from '../users/users.model';

Chart.register(CategoryScale);

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.css'
})

export class ProgressChartComponent {
  @ViewChild('myChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  
  users: User[] = [];
  selectedUser: User | null = null;
  chart: Chart | null = null;

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.createChart(this.selectedUser);
    }
  }

  loadUsers() {
    const workoutDataString = localStorage.getItem('workoutData');
    if (workoutDataString) {
      this.users = JSON.parse(workoutDataString);
      if(this.selectedUser) {
        const foundUser = this.users.find(u => u.id === this.selectedUser!.id);
        if (foundUser) {
          this.selectedUser = foundUser;
          this.updateChart(this.selectedUser);
        } else {
          this.selectedUser = null; 
        }
      }
    }
  }

  onSelectUser(user: any) {
    this.selectedUser = user;
    this.updateChart(user);
  }

  createChart(user: any) {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: user.workouts.map((w: any) => w.type),
          datasets: [{
            label: 'Minutes',
            data: user.workouts.map((w: any) => w.minutes),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  updateChart(user: any) {
    if (this.chart) {
      this.chart.data.labels = user.workouts.map((w: any) => w.type);
      this.chart.data.datasets[0].data = user.workouts.map((w: any) => w.minutes);
      this.chart.update();
    }
  }
}
