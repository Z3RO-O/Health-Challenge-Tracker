import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

import { User } from '@/app/components/users/users.model';
import { ChartService } from '@/app/services/chart/chart.service';

Chart.register(CategoryScale);

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.css',
})
export class ProgressChartComponent {
  [x: string]: any;
  @ViewChild('myChart') private chartRef!: ElementRef<HTMLCanvasElement>;

  users: User[] = [];
  selectedUser: User | null = null;
  chart: Chart | null = null;

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.users = this.loadUsers();
  }

  ngAfterViewInit() {
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.chartService.createChart(this.chartRef.nativeElement, this.selectedUser);
    }
  }

  loadUsers() {
    const workoutDataString = localStorage.getItem('workoutData');
    if (workoutDataString){ 
      if (!this.selectedUser && this.users.length > 0) {
        this.selectedUser = this.users[0];
        this.chartService.createChart(this.chartRef.nativeElement, this.selectedUser);
      }
      return JSON.parse(workoutDataString);
    }
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
    this.chartService.updateChart(user);
  }
}