import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { EASY_STEPS } from '../../../../models/constants/easySteps';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';

@Component({
  selector: 'app-how-it-works',
  imports: [LucideAngularModule, SectionHeading],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  readonly easySteps = EASY_STEPS;
}
