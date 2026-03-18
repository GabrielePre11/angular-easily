import { Component } from '@angular/core';
import {
  FOOTER_LINKS,
  MAIN_FOOTER_LINKS,
} from '../../models/constants/footerLinks';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, LucideAngularModule, RouterModule, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly mainLinks = MAIN_FOOTER_LINKS;
  readonly footerLinks = FOOTER_LINKS;

  readonly currentYear = new Date().getFullYear();
}
