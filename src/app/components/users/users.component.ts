import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'workouts', 'totalWorkouts', 'totalMinutes'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  ngOnInit() {
    this.loadUsers();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    const workoutDataString = localStorage.getItem('workoutData');
    if (workoutDataString) {
      this.dataSource.data = JSON.parse(workoutDataString);
    }
  }
}

export { User };
