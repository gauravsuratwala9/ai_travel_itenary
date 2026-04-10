import { useState, ChangeEvent } from 'react';
import { MapPin, Navigation, Loader2, AlertCircle, CheckCircle2, CreditCard as Edit3 } from 'lucide-react';

const mockNearbyPlaces = [
  { name: 'Sunset Rooftop Bar', distance: '0.2 km', type: 'Bar & Lounge', rating: 4.8 },
  { name: 'The Local Market', distance: '0.4 km', type: 'Food Market', rating: 4.6 },
  { name: 'Heritage Walking Trail', distance: '0.6 km', type: 'Outdoor', rating: 4.7 },
  { name: 'Cafe De Flore', distance: '0.3 km', type: 'Cafe', rating: 4.5 },
];

const mockLocations = [
  'Seminyak, Bali, Indonesia',
  'Ubud, Bali, Indonesia',
  'Canggu, Bali, Indonesia',
];

type Status = 'idle' | 'requesting' | 'detected' | 'denied' | 'manual';

export default function GpsDetector() {
  const [status, setStatus] = useState<Status>('idle');
  const [location, setLocation] = useState('');
  const [manualInput, setManualInput] = useState('');

  const requestLocation = () => {
    setStatus('requesting');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const mock = mockLocations[Math.floor(Math.random() * mockLocations.length)];
          setTimeout(() => {
            setLocation(mock);
            setStatus('detected');
          }, 1500);
        },
        () => {
          setTimeout(() => setStatus('denied'), 1200);
        },
        { timeout: 8000 }
      );
    } else {
      setTimeout(() => setStatus('denied'), 1200);
    }
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      setLocation(manualInput.trim());
      setStatus('detected');
    }
  };

  if (status === 'idle') {
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
            <Navigation size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Detect My Location</h3>
            <p className="text-xs text-gray-500">Find amazing spots near you right now</p>
          </div>
        </div>

        <button
          onClick={requestLocation}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
        >
          Enable GPS
        </button>

        <button
          onClick={() => setStatus('manual')}
          className="w-full mt-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <Edit3 size={13} />
          Enter location manually
        </button>
      </div>
    );
  }

  if (status === 'requesting') {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
          <Loader2 size={24} className="text-orange-500 animate-spin" />
        </div>
        <p className="font-semibold text-gray-700 text-sm">Detecting your location...</p>
        <p className="text-xs text-gray-400 text-center">Allow location access when prompted</p>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Location access denied</p>
            <p className="text-xs text-gray-400 mt-0.5">No problem — enter your location manually</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Seminyak, Bali"
            value={manualInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setManualInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleManualSubmit()}
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
          <button
            onClick={handleManualSubmit}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Go
          </button>
        </div>
      </div>
    );
  }

  if (status === 'manual') {
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Edit3 size={16} className="text-orange-500" />
          <p className="font-semibold text-gray-700 text-sm">Enter your location</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Seminyak, Bali"
            value={manualInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setManualInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleManualSubmit()}
            autoFocus
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
          <button
            onClick={handleManualSubmit}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Go
          </button>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-500" />
          <div>
            <p className="text-xs font-medium text-gray-500">Your location</p>
            <p className="font-semibold text-gray-900 text-sm">{location}</p>
          </div>
          <button
            onClick={() => { setStatus('idle'); setLocation(''); setManualInput(''); }}
            className="ml-auto text-xs text-gray-400 hover:text-orange-500 transition-colors"
          >
            Change
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <MapPin size={13} className="text-orange-500" />
          <p className="text-xs font-semibold text-gray-700">Spots near you</p>
        </div>
        <div className="space-y-2">
          {mockNearbyPlaces.map((place, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-xs truncate">{place.name}</p>
                <p className="text-[11px] text-gray-400">{place.type} · {place.distance}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-semibold text-amber-500">{place.rating}</span>
                <span className="text-amber-400 text-xs">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
