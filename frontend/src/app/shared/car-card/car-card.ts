import { Component, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Car } from '../../models/types/car.type';

@Component({
  selector: 'app-car-card',
  imports: [CommonModule, LucideAngularModule, CurrencyPipe],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  car = input.required<Car>();
}
