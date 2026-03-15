import {
  CarFront,
  Euro,
  HandCoins,
  MessageCircleQuestionMark,
} from 'lucide-angular';
import { RentalDeal } from '../types/rentalDeal';

export const RENTAL_DEALS: RentalDeal[] = [
  {
    icon: Euro,
    title: 'Best price guaranteed',
    desc: 'Find a lower price? We will refund you 100% of the difference.',
  },
  {
    icon: CarFront,
    title: 'Experienced drivers',
    desc: 'We have a team of experienced drivers',
  },
  {
    icon: HandCoins,
    title: 'Free cancellation',
    desc: 'No need to worry about cancellation fees.',
  },
  {
    icon: MessageCircleQuestionMark,
    title: '24/7 customer support',
    desc: 'We are available 24/7 to help you, anytime, anywhere.',
  },
];
