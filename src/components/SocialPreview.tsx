import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SocialPreviewProps {
  imageUrl: string;
  caption: string;
  onCaptionChange: (caption: string) => void;
}

export default function SocialPreview({ imageUrl, caption, onCaptionChange }: SocialPreviewProps) {
  const { user } = useApp();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const displayName = user?.name ?? 'traveler';
  const username = displayName.toLowerCase().replace(/\s+/g, '_');
  const avatar = user?.avatar ?? 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100';

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
    } catch {
      const el = document.createElement('textarea');
      el.value = caption;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const captionLines = caption.split('#');
  const mainText = captionLines[0].trim();
  const hashtags = captionLines.slice(1).map(h => '#' + h.trim()).filter(Boolean);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt={displayName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none">{username}</p>
            <p className="text-xs text-gray-400 mt-0.5">Voya Trip</p>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-gray-400" />
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt="Trip photo"
          className="w-full h-full object-cover"
        />
        {/* Voya watermark */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
          <span className="text-white text-[10px] font-semibold tracking-wide">Made with Voya</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className="transition-transform active:scale-125 duration-150"
            >
              <Heart
                size={22}
                className={`transition-colors duration-200 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
              />
            </button>
            <button>
              <MessageCircle size={22} className="text-gray-700" />
            </button>
            <button>
              <Send size={22} className="text-gray-700" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark
              size={22}
              className={`transition-colors duration-200 ${saved ? 'fill-gray-900 text-gray-900' : 'text-gray-700'}`}
            />
          </button>
        </div>

        <p className="text-xs font-semibold text-gray-900 mt-1.5">
          {liked ? '1,248' : '1,247'} likes
        </p>

        {/* Caption */}
        <div className="mt-1.5">
          {editing ? (
            <textarea
              value={caption}
              onChange={e => onCaptionChange(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              rows={4}
              className="w-full text-xs text-gray-700 leading-relaxed resize-none border border-orange-200 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          ) : (
            <div className="text-xs text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">{username} </span>
              {mainText}
              {hashtags.length > 0 && (
                <span className="text-blue-500 ml-1">{hashtags.join(' ')}</span>
              )}
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
          Just now
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-3 pb-3 flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Edit Caption
        </button>
        <button
          onClick={copyCaption}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-xs font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
        >
          {copied ? (
            <>
              <Check size={13} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy Caption
            </>
          )}
        </button>
      </div>
    </div>
  );
}
