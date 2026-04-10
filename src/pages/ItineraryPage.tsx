import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Camera, Share2, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ItineraryCard from '../components/ItineraryCard';

export default function ItineraryPage() {
  const { currentTrip, navigateTo } = useApp();
  const [activeDay, setActiveDay] = useState(0);

  if (!currentTrip) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 px-6">
        <p className="text-gray-500 text-sm text-center">No trip selected.</p>
        <button
          onClick={() => navigateTo('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm font-semibold"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const day = currentTrip.days[activeDay];
  const totalCost = currentTrip.days.flatMap(d => d.places).reduce((acc, p) => {
    const num = parseInt(p.cost.replace(/[^0-9]/g, '')) || 0;
    return acc + num;
  }, 0);
  const totalStops = currentTrip.days.reduce((a, d) => a + d.places.length, 0);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={currentTrip.coverImage}
          alt={currentTrip.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigateTo('dashboard')}
          className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Share */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <Share2 size={16} />
        </button>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {currentTrip.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-white text-xl font-black">{currentTrip.destination}</h1>
          <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{currentTrip.vibe}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 -mt-5 relative z-10 bg-white rounded-2xl shadow-md border border-gray-100 p-4 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Calendar size={12} className="text-orange-400" />
            <span className="text-xs text-gray-400">Duration</span>
          </div>
          <p className="text-sm font-bold text-gray-900">{currentTrip.duration} days</p>
        </div>
        <div className="text-center border-x border-gray-100">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <MapPin size={12} className="text-orange-400" />
            <span className="text-xs text-gray-400">Stops</span>
          </div>
          <p className="text-sm font-bold text-gray-900">{totalStops}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <DollarSign size={12} className="text-orange-400" />
            <span className="text-xs text-gray-400">Est. cost</span>
          </div>
          <p className="text-sm font-bold text-gray-900">${totalCost}</p>
        </div>
      </div>

      <div className="px-4 pt-5 pb-4">
        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 mb-5">
          {currentTrip.days.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeDay === i
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-orange-200 hover:text-orange-500'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        {/* Day label */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-base">{day.label}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={11} /> {day.places.length} stops
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} />
                {day.places[0]?.time} – {day.places[day.places.length - 1]?.time}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigateTo('experience')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold hover:bg-orange-100 transition-colors"
          >
            <Camera size={13} />
            Experience
          </button>
        </div>

        {/* Place cards */}
        <div>
          {day.places.map((place, i) => (
            <ItineraryCard key={place.id} place={place} index={i} />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigateTo('experience')}
          className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-sm shadow-md shadow-orange-200 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Camera size={16} />
          Enter Experience Mode
        </button>
      </div>
    </div>
  );
}
