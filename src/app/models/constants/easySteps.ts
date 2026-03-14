import { CalendarSearch, Car, MapPinned } from 'lucide-angular';
import { EasyStep } from '../types/easyStep';

export const EASY_STEPS: EasyStep[] = [
  {
    title: 'Choose location',
    desc: 'Pick up your car from your location',
    icon: MapPinned,
  },

  {
    title: 'Pick Up Date',
    desc: 'Select your pick up date and time to book your car',
    icon: CalendarSearch,
  },

  {
    title: 'Book your car',
    desc: 'Book your car and start your journey',
    icon: Car,
  },
];
