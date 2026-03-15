import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  imports: [CommonModule],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
})
export class SectionHeading {
  sectionSubtitle = input.required<string>();
  sectionTitle = input.required<string>();
  personalizedClass = input<string>('');
}
