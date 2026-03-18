import { Component } from '@angular/core';
import { CAR_LOGOS } from '../../../../models/constants/carsLogos';

@Component({
  selector: 'app-car-slider-section',
  imports: [],
  templateUrl: './car-slider-section.html',
  styleUrl: './car-slider-section.css',
})
export class CarSliderSection {
  // Cloned list to make it infinite
  readonly carsLogos = [...CAR_LOGOS, ...CAR_LOGOS];
}
