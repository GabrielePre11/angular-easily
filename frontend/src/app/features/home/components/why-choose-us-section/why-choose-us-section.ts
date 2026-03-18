import { Component, computed, effect, signal } from '@angular/core';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { RENTAL_DEALS } from '../../../../models/constants/rentalDeals';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-why-choose-us-section',
  imports: [SectionHeading, LucideAngularModule],
  templateUrl: './why-choose-us-section.html',
  styleUrl: './why-choose-us-section.css',
})
export class WhyChooseUsSection {
  readonly rentalDeals = RENTAL_DEALS;

  windowWidth = signal<number>(window.innerWidth);
  isMobile = computed(() => this.windowWidth() < 768);

  constructor() {
    effect((onCleanup) => {
      const updateWindowWidth = () => {
        this.windowWidth.set(window.innerWidth);
      };

      window.addEventListener('resize', updateWindowWidth);

      onCleanup(() => {
        window.removeEventListener('resize', updateWindowWidth);
      });
    });
  }
}
