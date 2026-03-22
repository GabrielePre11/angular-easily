import { User } from './user.type';

export interface Review {
  id: string;
  stars: number;
  comment: string;
  userId: string;
  carId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
