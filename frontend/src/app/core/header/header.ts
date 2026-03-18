import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
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
  readonly MenuIcon = Menu;

  isMobileMenuOpen = signal<boolean>(false);
  windowScrollY = signal<number>(0);
  isHeaderScrolled = computed(() => this.windowScrollY() > 0);

  constructor() {
    effect((onCleanup) => {
      const headerScroll = () => {
        this.windowScrollY.set(window.scrollY);
      };

      window.addEventListener('scroll', headerScroll);

      /**
       * @ onCleanup is a function that will be called when the component is destroyed
       * @ or when the component is removed from the DOM. It automatically cleanes up the event listener.
       */

      this.isMobileMenuOpen()
        ? document.body.classList.add('scrolled')
        : document.body.classList.remove('scrolled');

      onCleanup(() => {
        window.removeEventListener('scroll', headerScroll);
      });
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((prev) => !prev);
  }
}
