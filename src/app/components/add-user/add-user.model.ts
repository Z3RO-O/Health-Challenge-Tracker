export const workoutOptions = [
  { value: 'yoga', viewValue: 'Yoga' },
  { value: 'cycling', viewValue: 'Cycling' },
  { value: 'swimming', viewValue: 'Swimming' },
  { value: 'running', viewValue: 'Running' },
  { value: 'weightlifting', viewValue: 'Weightlifting' }
];

export interface Workout {
    type: string;
    minutes: number | null;
};