import { useState } from 'react';
import { Navigation, Camera, Share2, Sparkles } from 'lucide-react';
import GpsDetector from '../components/GpsDetector';
import PhotoUpload from '../components/PhotoUpload';
import SocialPreview from '../components/SocialPreview';

type Tab = 'gps' | 'photo' | 'share';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'gps', label: 'Nearby', icon: <Navigation size={15} /> },
  { id: 'photo', label: 'Photo', icon: <Camera size={15} /> },
  { id: 'share', label: 'Share', icon: <Share2 size={15} /> },
];

const fallbackImage = 'https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=800';
const fallbackCaption = 'Lost in paradise, found myself. Every corner tells a story — the kind that lingers long after you\'ve left. #Wanderlust #TravelVibes #Voya';

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<Tab>('gps');
  const [photoUrl, setPhotoUrl] = useState<string>(fallbackImage);
  const [caption, setCaption] = useState<string>(fallbackCaption);
  const [photoReady, setPhotoReady] = useState(false);

  const handlePhotoReady = (url: string, cap: string) => {
    setPhotoUrl(url);
    setCaption(cap);
    setPhotoReady(true);
    setTimeout(() => setActiveTab('share'), 300);
  };

  return (
    <div className="px-4 pt-5 pb-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">Experience Mode</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900">Live your trip</h1>
        <p className="text-sm text-gray-500 mt-1">Discover spots, capture moments, share your story.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === 'share' && photoReady && (
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'gps' && (
          <div className="space-y-4">
            <GpsDetector />
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-1">Pro tip</p>
              <p className="text-xs text-orange-600 leading-relaxed">
                Enable GPS to discover hidden gems, local favorites, and Voya-curated experiences within walking distance.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'photo' && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={14} className="text-orange-500" />
                <p className="text-xs font-bold text-orange-700">AI Caption Generator</p>
              </div>
              <p className="text-xs text-orange-600 leading-relaxed">
                Upload a photo from your trip and our AI will craft the perfect Instagram caption with hashtags instantly.
              </p>
            </div>

            <PhotoUpload onPhotoReady={handlePhotoReady} />

            {photoReady && (
              <button
                onClick={() => setActiveTab('share')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
              >
                <Share2 size={15} />
                Preview Social Post
              </button>
            )}
          </div>
        )}

        {activeTab === 'share' && (
          <div className="space-y-4">
            <SocialPreview
              imageUrl={photoUrl}
              caption={caption}
              onCaptionChange={setCaption}
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('photo')}
                className="py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Camera size={14} />
                New Photo
              </button>
              <button
                className="py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-sm font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Share2 size={14} />
                Share Post
              </button>
            </div>

            {/* Caption variants */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2.5">Try another caption style</p>
              <div className="space-y-2">
                {[
                  { style: 'Poetic', cap: 'The world is a book and those who don\'t travel only read one page. This chapter? Absolutely breathtaking. #Wanderlust #Voya' },
                  { style: 'Funny', cap: 'Spending my savings one flight at a time and zero regrets. Who needs a savings account anyway? ✈️ #TravelLife #Broke' },
                  { style: 'Minimal', cap: 'Here. Present. Grateful. #Travel #Voya' },
                ].map(v => (
                  <button
                    key={v.style}
                    onClick={() => setCaption(v.cap)}
                    className="w-full text-left p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 hover:bg-orange-50/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-600 group-hover:text-orange-600 transition-colors">{v.style}</span>
                      <span className="text-[10px] text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Use this</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{v.cap}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
