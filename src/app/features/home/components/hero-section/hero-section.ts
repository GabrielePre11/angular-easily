import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarDays, LucideAngularModule, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  readonly LocationIcon = MapPin;
  readonly Calendar = CalendarDays;
}
