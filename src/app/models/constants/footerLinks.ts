import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PhoneCall,
  Twitter,
} from 'lucide-angular';
import { FooterLink, MainFooterLink } from '../types/footerTypes';

export const MAIN_FOOTER_LINKS: MainFooterLink[] = [
  {
    id: 0,
    link: '1234, Main Street, New York, USA',
    icon: MapPin,
  },

  {
    id: 1,
    link: '+1 234 567 890',
    icon: PhoneCall,
  },

  {
    id: 2,
    link: 'easily@gmail.com',
    icon: Mail,
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  {
    title: 'Our Products',
    links: [
      {
        name: 'Career',
        url: '/career',
      },
      {
        name: 'Car',
        url: '/car',
      },
      {
        name: 'Packages',
        url: '/packages',
      },
      {
        name: 'Features',
        url: '/features',
      },
      {
        name: 'Priceline',
        url: '/priceline',
      },
    ],
  },

  {
    title: 'Resources',
    links: [
      {
        name: 'Download',
        url: '/download',
      },
      {
        name: 'Help Center',
        url: '/help-center',
      },
      {
        name: 'Guides',
        url: '/guides',
      },
      {
        name: 'Partners',
        url: '/partners',
      },
      {
        name: 'Cruises',
        url: '/cruises',
      },
      {
        name: 'Developers',
        url: '/developers',
      },
    ],
  },

  {
    title: 'About Easily',
    links: [
      {
        name: 'Why Choose Us',
        url: '/why-choose-us',
      },
      {
        name: 'Our Story',
        url: '/our-story',
      },
      {
        name: 'Investor Relations',
        url: '/investor-relations',
      },
      {
        name: 'Press Center',
        url: '/press-center',
      },
      {
        name: 'Advertising',
        url: '/advertising',
      },
    ],
  },

  {
    title: 'Follow Us',
    links: [
      {
        name: 'Facebook',
        icon: Facebook,
      },
      {
        name: 'Instagram',
        icon: Instagram,
      },
      {
        name: 'Twitter',
        icon: Twitter,
      },
    ],
  },
];
