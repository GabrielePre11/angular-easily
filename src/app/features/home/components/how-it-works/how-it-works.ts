import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { EASY_STEPS } from '../../../../models/constants/easySteps';

@Component({
  selector: 'app-how-it-works',
  imports: [LucideAngularModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  readonly easySteps = EASY_STEPS;
}
