import React, { useState } from 'react';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Edit3, 
  Check, 
  Eye, 
  Sparkles,
  Layers
} from 'lucide-react';
import { HeroSlideItem } from '../../types/websiteContent';
import { ImageManagerModal } from './ImageManagerModal';

interface HeroSlidesManagerProps {
  slides: HeroSlideItem[];
  onUpdateSlides: (slides: HeroSlideItem[]) => void;
}

export const HeroSlidesManager: React.FC<HeroSlidesManagerProps> = ({
  slides,
  onUpdateSlides
}) => {
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [isAddingSlide, setIsAddingSlide] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBadge, setNewBadge] = useState<string>('Best Seller 2025');
  const [newCaption, setNewCaption] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp');
  const [newCategory, setNewCategory] = useState<string>('banners');

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const next = [...slides];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    onUpdateSlides(next);
  };

  const deleteSlide = (id: string) => {
    if (slides.length <= 1) {
      alert('The hero banner must have at least one slide.');
      return;
    }
    onUpdateSlides(slides.filter((s) => s.id !== id));
  };

  const handleSaveEditedSlide = (data: { imageUrl: string; title?: string; description?: string }) => {
    if (!editingSlide) return;
    const next = slides.map((s) => 
      s.id === editingSlide.id 
        ? {
            ...s,
            imageUrl: data.imageUrl,
            ...(data.title ? { title: data.title } : {}),
            ...(data.description ? { caption: data.description } : {})
          }
        : s
    );
    onUpdateSlides(next);
    setEditingSlide(null);
  };

  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSlide: HeroSlideItem = {
      id: `hero-slide-${Date.now()}`,
      title: newTitle.trim(),
      badge: newBadge.trim() || 'Featured',
      caption: newCaption.trim() || 'Professional high-quality printing delivered nationwide.',
      imageUrl: newImageUrl.trim(),
      category: newCategory,
      aspectRatio: '16/9'
    };

    onUpdateSlides([...slides, newSlide]);
    setIsAddingSlide(false);
    setNewTitle('');
    setNewCaption('');
    setNewBadge('Best Seller 2025');
  };

  return (
    <div className="space-y-6 text-stone-900">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Storefront Top Hero Carousel</span>
          </div>
          <h2 className="text-xl font-black text-stone-900 tracking-tight">
            Manage Hero Slides ({slides.length})
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Control the visual slides rotating in the top hero section. You can upload custom images, change labels, captions, and reorder slide sequence.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingSlide(true)}
          className="px-4 py-2.5 bg-[#00473e] hover:bg-[#03554a] active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Slide List */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            {/* Left: Thumbnail & Sequence Order */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveSlide(index, 'up')}
                  className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Move slide earlier"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-stone-500">
                  #{index + 1}
                </span>
                <button
                  type="button"
                  disabled={index === slides.length - 1}
                  onClick={() => moveSlide(index, 'down')}
                  className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Move slide later"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative group">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setEditingSlide(slide)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold cursor-pointer"
                >
                  Replace
                </button>
              </div>

              {/* Title & Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold uppercase tracking-wider">
                    {slide.badge}
                  </span>
                  <span className="text-[10px] text-stone-400 capitalize font-medium">
                    Category: {slide.category}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  {slide.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-1 max-w-md">
                  {slide.caption}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                type="button"
                onClick={() => setEditingSlide(slide)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Edit Details &amp; Image</span>
              </button>

              <button
                type="button"
                onClick={() => deleteSlide(slide.id)}
                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Delete slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Slide Modal */}
      {editingSlide && (
        <ImageManagerModal
          isOpen={true}
          onClose={() => setEditingSlide(null)}
          currentImageUrl={editingSlide.imageUrl}
          title={`Edit Hero Slide: ${editingSlide.title}`}
          subtitle="Change the slide photo, rename the title, or update the promotional caption."
          currentTitle={editingSlide.title}
          currentDescription={editingSlide.caption}
          allowDetailsEdit={true}
          onSave={handleSaveEditedSlide}
        />
      )}

      {/* Add New Slide Modal */}
      {isAddingSlide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAddingSlide(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#f5be38]" />
                <span>Add New Hero Slide</span>
              </h3>
              <button 
                onClick={() => setIsAddingSlide(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSlide} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Slide Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Deluxe Teardrop Roll-up Banner Stand"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="e.g. Best Seller 2025"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category Target</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="banners">Banners &amp; Stands</option>
                    <option value="awards">Awards &amp; Plaques</option>
                    <option value="packaging">Boxes &amp; Packaging</option>
                    <option value="stationery">Office Stationery</option>
                    <option value="gifts">Gifts &amp; Souvenirs</option>
                    <option value="signage">Signage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Caption / Subtitle</label>
                <textarea
                  rows={2}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Brief descriptive text displayed under the slide title..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddingSlide(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00473e] text-white rounded-xl font-bold shadow-md hover:bg-[#03554a]"
                >
                  Add Slide to Hero
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
