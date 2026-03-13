import { Component, input, output } from '@angular/core';
import { Logo } from '../../shared/logo/logo';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { mobileMenuFooterIcons } from '../../models/constants/mobileMenuIcons';
import { MOBILE_MENU_LINKS } from '../../models/constants/menuLinks';

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterModule, CommonModule, Logo, LucideAngularModule],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {
  readonly mobileMenuLinks = MOBILE_MENU_LINKS;
  readonly mobileMenuFooterIcons = mobileMenuFooterIcons;
  readonly XIcon = X;

  isOpen = input.required<boolean>();
  close = output<boolean>();

  closeMobileMenu() {
    this.close.emit(false);
  }
}
