import { Clock, DollarSign, Sparkles, Utensils, Landmark, Bed, Zap, Navigation } from 'lucide-react';
import { TripPlace } from '../types';

interface ItineraryCardProps {
  place: TripPlace;
  index: number;
}

const categoryConfig = {
  food: { label: 'Food & Drink', icon: Utensils, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  attraction: { label: 'Attraction', icon: Landmark, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  accommodation: { label: 'Stay', icon: Bed, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  activity: { label: 'Activity', icon: Zap, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  transport: { label: 'Transport', icon: Navigation, color: 'text-gray-600 bg-gray-50 border-gray-200' },
};

export default function ItineraryCard({ place, index }: ItineraryCardProps) {
  const config = categoryConfig[place.category];
  const CategoryIcon = config.icon;

  return (
    <div className="flex gap-3 group">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
          {index + 1}
        </div>
        <div className="w-0.5 bg-gradient-to-b from-orange-200 to-transparent flex-1 mt-1 min-h-[20px]" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all duration-300 hover:shadow-md">
        <div className="relative h-32 overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
              <CategoryIcon size={10} />
              {config.label}
            </span>
          </div>
        </div>

        <div className="p-3">
          <h4 className="font-semibold text-gray-900 text-sm leading-snug">{place.name}</h4>

          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={11} className="text-orange-400" />
              {place.time}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <DollarSign size={11} className="text-orange-400" />
              {place.cost}
            </span>
          </div>

          <div className="mt-2 p-2 rounded-xl bg-orange-50 border border-orange-100">
            <div className="flex items-start gap-1.5">
              <Sparkles size={11} className="text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700 leading-relaxed">{place.why}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
