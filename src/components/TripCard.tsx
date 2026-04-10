import { MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
}

export default function TripCard({ trip, onClick }: TripCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 active:scale-[0.99]"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.destination}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-lg leading-tight">{trip.destination}</h3>
          <p className="text-white/80 text-xs mt-0.5 line-clamp-1">{trip.vibe}</p>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {trip.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium border border-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-orange-400" />
            {trip.duration} days
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={13} className="text-orange-400" />
            {trip.budget}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-orange-400" />
            {trip.days.reduce((a, d) => a + d.places.length, 0)} stops
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">
            Created {new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-orange-500">
            View itinerary <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}
