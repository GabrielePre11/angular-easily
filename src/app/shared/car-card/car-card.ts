import { Component, input } from '@angular/core';
import { CarMockup } from '../../models/types/carMockup';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-car-card',
  imports: [CommonModule, LucideAngularModule, CurrencyPipe],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  car = input.required<CarMockup>();
}
