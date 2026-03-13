import { Component } from '@angular/core';
import { DESKTOP_MENU_LINKS } from '../../models/constants/menuLinks';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './desktop-menu.html',
  styleUrl: './desktop-menu.css',
})
export class DesktopMenu {
  readonly desktopMenuLinks = DESKTOP_MENU_LINKS;
}
