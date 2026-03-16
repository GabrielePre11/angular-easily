import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { CommonModule } from '@angular/common';
import { CARS_MOCKUP } from '../../../../models/constants/carsMockup';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cars-section',
  imports: [CommonModule, SectionHeading, LucideAngularModule],
  templateUrl: './cars-section.html',
  styleUrl: './cars-section.css',
})
export class CarsSection {
  readonly cars = CARS_MOCKUP;
}
