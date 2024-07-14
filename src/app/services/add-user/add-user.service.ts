import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@/app/components/users/users.component';
import { Workout } from '@/app/components/add-user/add-user.model';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  constructor(private _snackBar: MatSnackBar) {}

  addUser(name: string, workoutType: string, workoutMinutes: number | null): boolean {
    if (!name || !workoutType || workoutMinutes === null) {
      this.openSnackBar('All fields are required!', 'Close');
      return false;
    }

    const newWorkout: Workout = {
      type: workoutType,
      minutes: workoutMinutes,
    };

    let users = JSON.parse(localStorage.getItem('workoutData') || '[]');
    const userIndex = users.findIndex((user: User) => user.name === name);

    if (userIndex !== -1) {
      const user = users[userIndex];
      const workoutIndex = user.workouts.findIndex(
        (workout: Workout) => workout.type === workoutType
      );

      if (workoutIndex !== -1) {
        user.workouts[workoutIndex].minutes += newWorkout.minutes;
        user.totalMinutes += newWorkout.minutes;
      } else {
        user.workouts.push(newWorkout);
        user.totalWorkouts += 1;
        user.totalMinutes += newWorkout.minutes;
      }
    } else {
      const newUser: User = {
        id: users.length + 1,
        name: name,
        workouts: [newWorkout],
        totalWorkouts: 1,
        totalMinutes: newWorkout.minutes,
      };
      users.push(newUser);
    }

    localStorage.setItem('workoutData', JSON.stringify(users));
    this.openSnackBar('User added successfully!', 'Close');
    return true;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
