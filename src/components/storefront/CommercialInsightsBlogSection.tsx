import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BlogPostItem {
  id: string;
  title: string;
  image: string;
  dateStr: string;
}

const BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    title: 'Pro Tips on High-Quality Printing',
    image: '/brochures-event-programs-flyers.jpg',
    dateStr: 'Aug 20, 2026',
  },
  {
    id: 'post-2',
    title: 'Best T-Shirt Design Ideas',
    image: '/executive-embroidered-polo-shirts.jpg',
    dateStr: 'Aug 18, 2026',
  },
  {
    id: 'post-3',
    title: 'How to Choose the Right Printing Service',
    image: '/industrial-large-format-printer.jpg',
    dateStr: 'Aug 16, 2026',
  },
];

interface CommercialInsightsBlogSectionProps {
  onExploreInsights?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const CommercialInsightsBlogSection: React.FC<CommercialInsightsBlogSectionProps> = ({
  onExploreInsights,
  onSelectCategory,
}) => {
  return (
    <section 
      aria-label="Read Our Latest Blog Post"
      className="relative bg-[#070204] text-white py-10 sm:py-14 border-b border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Read Our Latest Blog Post
          </h2>
        </div>

        {/* 3-Column Clean Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={onExploreInsights}
              className="bg-[#121217] hover:bg-[#1a1a22] rounded-2xl overflow-hidden border border-stone-800 hover:border-stone-600 shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-[16/10] bg-black/60 overflow-hidden relative border-b border-stone-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-3">
                <div className="text-xs text-stone-400 font-medium">
                  {post.dateStr}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ffd25d] transition-colors leading-snug">
                  {post.title}
                </h3>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#ffd25d]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
