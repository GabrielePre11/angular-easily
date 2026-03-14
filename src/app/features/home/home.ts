import { Component } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { CarSliderSection } from './components/car-slider-section/car-slider-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, HowItWorks, CarSliderSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
