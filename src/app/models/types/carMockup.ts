import { LucideIconData } from 'lucide-angular';

export interface CarMockup {
  id: number;
  brand: string;
  model: string;
  stars: number;
  reviews: number;
  image: string;
  specs: { label: string; icon: LucideIconData }[];
  pricePerDay: number;
}
