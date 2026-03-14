import { Component } from '@angular/core';
import { EASY_STEPS } from '../../../models/constants/easySteps';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-how-it-works',
  imports: [LucideAngularModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  readonly easySteps = EASY_STEPS;
}
