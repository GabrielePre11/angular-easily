import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { CommonModule } from '@angular/common';
import { TESTIMONIALS } from '../../../../models/constants/testimonials';
import {
  ArrowLeft,
  ArrowRight,
  LucideAngularModule,
  Star,
} from 'lucide-angular';

@Component({
  selector: 'app-testimonials-section',
  imports: [SectionHeading, CommonModule, LucideAngularModule],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
})
export class TestimonialsSection {
  readonly testimonials = TESTIMONIALS;
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  stars = Array.from({ length: 5 });

  sliderRef = viewChild<ElementRef<HTMLUListElement>>('testimonialsSliderRef');
  currentIndex = signal<number>(0);

  goToSlide(index: number) {
    this.sliderRef()!.nativeElement.scrollTo({
      left: index * this.sliderRef()!.nativeElement.offsetWidth,
      behavior: 'smooth',
    });
    this.currentIndex.set(index);
  }

  goToPrevSlide() {
    const prevIndex = this.currentIndex() - 1;
    this.goToSlide(prevIndex < 0 ? this.testimonials.length - 1 : prevIndex);
  }

  goToNextSlide() {
    const nextIndex = this.currentIndex() + 1;
    this.goToSlide(nextIndex > this.testimonials.length - 1 ? 0 : nextIndex);
  }
}
