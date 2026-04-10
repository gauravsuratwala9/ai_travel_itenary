import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loadingSteps, mockTrips } from '../data/mockData';
import { Trip } from '../types';

export default function LoadingPage() {
  const { pendingForm, addTrip, setCurrentTrip, navigateTo } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let step = 0;
    const advance = () => {
      if (step < loadingSteps.length - 1) {
        step++;
        setCurrentStep(step);
        setTimeout(advance, 900 + Math.random() * 400);
      } else {
        setTimeout(() => setDone(true), 800);
      }
    };
    setTimeout(advance, 900);
  }, []);

  useEffect(() => {
    if (!done) return;
    setTimeout(() => {
      const destination = pendingForm?.destination || 'Bali, Indonesia';
      const template = mockTrips[0];

      const newTrip: Trip = {
        id: crypto.randomUUID(),
        destination,
        vibe: pendingForm?.vibe || 'Adventure awaits',
        duration: pendingForm?.duration || 7,
        budget: getBudgetLabel(pendingForm?.budget),
        coverImage: getDestinationImage(destination),
        tags: pendingForm?.tags.slice(0, 3) || ['adventure'],
        createdAt: new Date().toISOString().split('T')[0],
        days: template.days,
      };

      addTrip(newTrip);
      setCurrentTrip(newTrip);
      navigateTo('itinerary');
    }, 1000);
  }, [done]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Animated Compass */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center shadow-xl shadow-orange-200">
          <MapPin size={40} className="text-white" />
        </div>
        <div className="absolute -inset-3 rounded-[28px] border-2 border-orange-200 animate-ping opacity-40" />
        <div className="absolute -inset-6 rounded-[36px] border border-orange-100 animate-ping opacity-20" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* Destination */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Sparkles size={14} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">AI is working</span>
        </div>
        <h2 className="text-2xl font-black text-gray-900">
          Planning your trip to
        </h2>
        <h3 className="text-2xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          {pendingForm?.destination || 'paradise'}
        </h3>
      </div>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-3 mb-8">
        {loadingSteps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          const isPending = i > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                isActive ? 'bg-orange-50 border border-orange-100 scale-[1.02]' :
                isCompleted ? 'bg-gray-50' :
                'opacity-40'
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : isActive ? (
                  <Loader2 size={18} className="text-orange-500 animate-spin" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300" />
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${isActive ? 'text-orange-700' : isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                  {step.text}
                </p>
                {isActive && (
                  <p className="text-xs text-orange-500 mt-0.5">{step.sub}</p>
                )}
              </div>
              {isPending && <div />}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Generating itinerary</span>
          <span>{Math.round((currentStep / (loadingSteps.length - 1)) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-700"
            style={{ width: `${(currentStep / (loadingSteps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {done && (
        <div className="mt-6 flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} className="text-green-500" />
          <p className="text-sm font-semibold text-green-600">Done! Opening your itinerary...</p>
        </div>
      )}
    </div>
  );
}

function getBudgetLabel(budget?: string): string {
  const map: Record<string, string> = {
    budget: 'Under $500',
    mid: '$500–$2,000',
    premium: '$2,000–$5,000',
    luxury: '$5,000+',
  };
  return map[budget ?? 'mid'] ?? '$500–$2,000';
}

function getDestinationImage(destination: string): string {
  const lower = destination.toLowerCase();
  if (lower.includes('japan') || lower.includes('tokyo') || lower.includes('kyoto')) {
    return 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800';
  }
  if (lower.includes('italy') || lower.includes('rome') || lower.includes('amalfi')) {
    return 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800';
  }
  if (lower.includes('paris') || lower.includes('france')) {
    return 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800';
  }
  return 'https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=800';
}
