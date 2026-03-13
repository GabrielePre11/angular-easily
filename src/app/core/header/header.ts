import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo } from '../../shared/logo/logo';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { DesktopMenu } from '../desktop-menu/desktop-menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    Logo,
    MobileMenu,
    LucideAngularModule,
    DesktopMenu,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMobileMenuOpen = signal<boolean>(false);

  readonly MenuIcon = Menu;

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((prev) => !prev);
  }
}
