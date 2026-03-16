import { LucideIconData } from 'lucide-angular';

export type MainFooterLink = {
  id: number;
  link: string;
  icon: LucideIconData;
};

export type Link = {
  name?: string;
  url?: string;
  icon?: LucideIconData;
};

export type FooterLink = {
  title: string;
  links: Link[];
};
