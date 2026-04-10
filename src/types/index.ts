export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface TripPlace {
  id: string;
  name: string;
  time: string;
  cost: string;
  why: string;
  category: 'food' | 'attraction' | 'accommodation' | 'activity' | 'transport';
  image: string;
}

export interface TripDay {
  day: number;
  label: string;
  places: TripPlace[];
}

export interface Trip {
  id: string;
  destination: string;
  vibe: string;
  duration: number;
  budget: string;
  coverImage: string;
  days: TripDay[];
  createdAt: string;
  tags: string[];
}

export type Page = 'auth' | 'dashboard' | 'create' | 'loading' | 'itinerary' | 'experience';

export interface CreateTripForm {
  destination: string;
  vibe: string;
  duration: number;
  budget: string;
  tags: string[];
}
