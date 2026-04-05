import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CarCard } from '../../../../shared/car-card/car-card';
import { CarService } from '../../../../services/car.service';
import { CarSkeletonCard } from '../../../../shared/car-skeleton-card/car-skeleton-card';

@Component({
  selector: 'app-cars-section',
  imports: [
    CommonModule,
    SectionHeading,
    LucideAngularModule,
    CarCard,
    CarSkeletonCard,
  ],
  templateUrl: './cars-section.html',
  styleUrl: './cars-section.css',
})
export class CarsSection {
  protected carsService = inject(CarService);

  isLoading = this.carsService.isLoading;
  errorState = this.carsService.errorState;
  heroCars = this.carsService.cars;
}
