import { useState, ChangeEvent, FormEvent } from 'react';
import { ArrowRight, MapPin, Calendar, Wallet, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { vibeChips, budgetOptions } from '../data/mockData';
import { CreateTripForm } from '../types';

export default function CreateTripPage() {
  const { navigateTo, setPendingForm } = useApp();

  const [form, setForm] = useState<CreateTripForm>({
    destination: '',
    vibe: '',
    duration: 5,
    budget: 'mid',
    tags: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateTripForm, string>>>({});

  const toggleTag = (id: string) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(id) ? f.tags.filter(t => t !== id) : [...f.tags, id].slice(0, 4),
    }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof CreateTripForm, string>> = {};
    if (!form.destination.trim()) e.destination = 'Please enter a destination';
    if (!form.vibe.trim()) e.vibe = 'Tell us about your vibe';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setPendingForm(form);
    navigateTo('loading');
  };

  return (
    <div className="px-4 pt-5 pb-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">AI Trip Planner</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900">Create your trip</h1>
        <p className="text-sm text-gray-500 mt-1">Tell us how you want to feel — we'll handle the rest.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Vibe — Primary Focus */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-100">
          <label className="flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wide mb-2">
            <Sparkles size={12} />
            Your Vibe
          </label>
          <textarea
            placeholder='e.g. "Laid-back beach days, great food, watching sunsets with a cold drink in hand..."'
            value={form.vibe}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, vibe: e.target.value }))}
            rows={3}
            className="w-full bg-white rounded-xl px-3.5 py-3 text-sm text-gray-700 placeholder-gray-400 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all resize-none"
          />
          {errors.vibe && <p className="text-xs text-red-500 mt-1">{errors.vibe}</p>}

          {/* Vibe chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {vibeChips.map(chip => (
              <button
                key={chip.id}
                type="button"
                onClick={() => toggleTag(chip.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  form.tags.includes(chip.id)
                    ? 'bg-orange-500 text-white shadow-sm scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
          {form.tags.length > 0 && (
            <p className="text-[11px] text-orange-500 mt-2 font-medium">
              {form.tags.length} vibe{form.tags.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            <MapPin size={12} className="text-orange-400" />
            Destination
          </label>
          <input
            type="text"
            placeholder="e.g. Bali, Tokyo, Amalfi Coast..."
            value={form.destination}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, destination: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
          />
          {errors.destination && <p className="text-xs text-red-500 mt-1">{errors.destination}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            <Calendar size={12} className="text-orange-400" />
            Duration — <span className="text-orange-500">{form.duration} days</span>
          </label>
          <input
            type="range"
            min={1}
            max={21}
            value={form.duration}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, duration: parseInt(e.target.value) }))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>1 day</span>
            <span>Weekend</span>
            <span>1 week</span>
            <span>2 weeks</span>
            <span>3 weeks</span>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            <Wallet size={12} className="text-orange-400" />
            Budget
          </label>
          <div className="grid grid-cols-2 gap-2">
            {budgetOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setForm(f => ({ ...f, budget: opt.id }))}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  form.budget === opt.id
                    ? 'border-orange-400 bg-orange-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-orange-200'
                }`}
              >
                <p className={`text-sm font-semibold ${form.budget === opt.id ? 'text-orange-600' : 'text-gray-700'}`}>
                  {opt.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{opt.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-orange-200 mt-2"
        >
          <Sparkles size={18} />
          Generate My Itinerary
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
