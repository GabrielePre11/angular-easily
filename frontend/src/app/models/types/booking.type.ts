import { User } from './user.type';

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
