import { Component } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { HowItWorks } from './how-it-works/how-it-works';

@Component({
  selector: 'app-home',
  imports: [HeroSection, HowItWorks],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
