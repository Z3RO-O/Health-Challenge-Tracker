import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../users/users.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  name: string = '';
  workoutMinutes: number | null = null;
  workoutType: string | null = null;

  workoutOptions = [
    { value: 'cycling', viewValue: 'Cycling' },
    { value: 'swimming', viewValue: 'Swimming' },
    { value: 'running', viewValue: 'Running' },
    { value: 'weightlifting', viewValue: 'Weightlifting' }
  ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newWorkout = {
        type: this.workoutType,
        minutes: this.workoutMinutes
      };

      let users = JSON.parse(localStorage.getItem('workoutData') || '[]');
      const userIndex = users.findIndex((user: User) => user.name === this.name);

      if (userIndex !== -1) {
        users[userIndex].workouts.push(newWorkout);
        users[userIndex].totalWorkouts += 1;
        users[userIndex].totalMinutes += newWorkout.minutes;
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
    }
  }
}
