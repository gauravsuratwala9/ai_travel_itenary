import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { mockCaptions } from '../data/mockData';

interface PhotoUploadProps {
  onPhotoReady: (imageUrl: string, caption: string) => void;
}

export default function PhotoUpload({ onPhotoReady }: PhotoUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    generateCaption(url);
  };

  const generateCaption = (imageUrl: string) => {
    setGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 12;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setGenerating(false);
      const caption = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
      onPhotoReady(imageUrl, caption);
    }, 2000);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (preview) {
    return (
      <div className="space-y-3">
        <div className="relative rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          {generating && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles size={22} className="text-yellow-300 animate-pulse" />
              </div>
              <p className="text-white font-semibold text-sm">Crafting your caption...</p>
              <div className="w-40 bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {!generating && (
          <button
            onClick={() => {
              setPreview(null);
              setProgress(0);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Upload different photo
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
        dragging
          ? 'border-orange-400 bg-orange-50 scale-[1.01]'
          : 'border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
        dragging ? 'bg-orange-500' : 'bg-gradient-to-br from-orange-500 to-yellow-400'
      }`}>
        {dragging ? (
          <Loader2 size={24} className="text-white animate-spin" />
        ) : (
          <Upload size={24} className="text-white" />
        )}
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-700 text-sm">
          {dragging ? 'Drop it here!' : 'Upload a trip photo'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Drag & drop or click to browse
        </p>
      </div>

      <div className="flex items-center gap-1.5 mt-1">
        <ImageIcon size={12} className="text-gray-300" />
        <span className="text-[11px] text-gray-400">JPG, PNG, WEBP supported</span>
      </div>
    </div>
  );
}
