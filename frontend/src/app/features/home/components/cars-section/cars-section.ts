import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CarCard } from '../../../../shared/car-card/car-card';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-cars-section',
  imports: [CommonModule, SectionHeading, LucideAngularModule, CarCard],
  templateUrl: './cars-section.html',
  styleUrl: './cars-section.css',
})
export class CarsSection implements OnInit {
  private carsService = inject(CarService);
  readonly heroCars = this.carsService.cars;

  isLoading = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    this.isLoading.set(true);

    this.carsService.getCars().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
      },
    });
  }
}
