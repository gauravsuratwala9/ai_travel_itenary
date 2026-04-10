import { Plus, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TripCard from '../components/TripCard';

const destinations = [
  { name: 'Santorini', img: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Kyoto', img: 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'NYC', img: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Maldives', img: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function DashboardPage() {
  const { user, trips, navigateTo, setCurrentTrip } = useApp();
  const firstName = user?.name?.split(' ')[0] ?? 'Traveler';

  return (
    <div className="px-4 pt-5 pb-6 space-y-6">
      {/* Greeting */}
      <div>
        <p className="text-sm text-gray-400 font-medium">Good morning,</p>
        <h1 className="text-2xl font-black text-gray-900 mt-0.5">
          {firstName} <span className="wave">👋</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Where are we going next?</p>
      </div>

      {/* AI Banner */}
      <button
        onClick={() => navigateTo('create')}
        className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 p-5 text-left shadow-md shadow-orange-200/60 hover:opacity-95 transition-opacity active:scale-[0.99]"
      >
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -right-2 bottom-2 w-16 h-16 bg-white/10 rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={14} className="text-yellow-100" />
              <span className="text-xs font-semibold text-yellow-100 uppercase tracking-wide">AI Planner</span>
            </div>
            <h2 className="text-white font-bold text-lg leading-tight">Plan your next trip</h2>
            <p className="text-white/80 text-xs mt-1">Describe your vibe, we do the rest</p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Plus size={22} className="text-white" />
          </div>
        </div>
      </button>

      {/* Trending Destinations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-orange-500" />
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Trending</h2>
        </div>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {destinations.map(d => (
            <button
              key={d.name}
              onClick={() => navigateTo('create')}
              className="flex-shrink-0 relative rounded-xl overflow-hidden w-28 h-16 group shadow-sm"
            >
              <img src={d.img} alt={d.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-1.5 left-0 right-0 text-center text-white text-[11px] font-bold">{d.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* My Trips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-orange-500" />
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">My Trips</h2>
          </div>
          <span className="text-xs text-gray-400">{trips.length} trips</span>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
              <MapPin size={22} className="text-orange-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-700 text-sm">No trips yet</p>
              <p className="text-xs text-gray-400 mt-1">Create your first AI-planned trip</p>
            </div>
            <button
              onClick={() => navigateTo('create')}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
            >
              Create your first trip
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => {
                  setCurrentTrip(trip);
                  navigateTo('itinerary');
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
