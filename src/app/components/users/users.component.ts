import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {
  displayedColumns: string[] = ['name', 'workouts', 'totalWorkouts', 'totalMinutes'];
  dataSource = new MatTableDataSource<User>(JSON.parse(localStorage.getItem('workoutData') || '') || null);

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}

export interface User {
  id: number;
  name: string;
  workouts:[{ type: string | null; minutes: number | null; }];
  totalWorkouts: number;
  totalMinutes: number|null;
}
