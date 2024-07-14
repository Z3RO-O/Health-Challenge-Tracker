import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material/tooltip';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../users/users.component';
import { Workout, workoutOptions } from './add-user.model';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 200,
  hideDelay: 500,
  touchendHideDelay: 800,
  position: 'after',
};

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './add-user.component.html',
  providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  constructor(private _snackBar: MatSnackBar) {}

  @Output() userAdded = new EventEmitter<void>();

  name: string = '';
  workoutMinutes: number | null = null;
  workoutType: string = '';
  workoutOptions = workoutOptions;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
        duration: 2000
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newWorkout : Workout = {
        type: this.workoutType,
        minutes: this.workoutMinutes
      };

      let users = JSON.parse(localStorage.getItem('workoutData') || '[]');
      const userIndex = users.findIndex((user: User) => user.name === this.name);

      if (userIndex !== -1) {
        const user = users[userIndex];
        const workoutIndex = user.workouts.findIndex((workout: Workout) => workout.type === this.workoutType);
        
        if (workoutIndex !== -1) {
          user.workouts[workoutIndex].minutes += newWorkout.minutes;
          user.totalMinutes += newWorkout.minutes;
        } else {
          user.workouts.push(newWorkout);
          user.totalWorkouts += 1;
          user.totalMinutes += newWorkout.minutes;
        }
      } else {
        const newUser : User = {
          id: users.length+1,
          name: this.name,
          workouts: [newWorkout],
          totalWorkouts: 1,
          totalMinutes: newWorkout.minutes
        };
        users.push(newUser);
      }

      localStorage.setItem('workoutData', JSON.stringify(users));

      this.name = '';
      this.workoutType = '';
      this.workoutMinutes = null;
      form.resetForm();
      this.openSnackBar('User added successfully!', 'Close');
      this.userAdded.emit();
    }
  }
}

export  { Workout, workoutOptions };