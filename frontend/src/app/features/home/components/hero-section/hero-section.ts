import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarDays, LucideAngularModule, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  readonly LocationIcon = MapPin;
  readonly Calendar = CalendarDays;
  private readonly todayDate = new Date().toISOString().split('T')[0];

  location = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ],
  });

  pickUpDate = new FormControl<string>(this.todayDate, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
    ],
  });

  returnDate = new FormControl<string>(this.todayDate, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
    ],
  });

  pickUpValue = toSignal(this.pickUpDate.valueChanges, {
    initialValue: this.todayDate,
  });

  constructor() {
    effect(() => {
      const currentPickUpDate = this.pickUpValue();

      if (this.returnDate.value < currentPickUpDate) {
        this.returnDate.setValue(currentPickUpDate);
      }
    });
  }

  submit(ev: Event) {
    ev.preventDefault();
    console.log({
      location: this.location.value,
      pickUpDate: this.pickUpDate.value,
      returnDate: this.returnDate.value,
    });
  }
}
