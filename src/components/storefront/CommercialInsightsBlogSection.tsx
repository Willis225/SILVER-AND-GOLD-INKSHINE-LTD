import React from 'react';

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
      className="relative bg-white text-slate-900 py-10 sm:py-14 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header: Centered */}
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Read Our Latest Blog Post
          </h2>
        </div>

        {/* 3-Column Clean Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={onExploreInsights}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>

              {/* Content Box */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-black transition-colors leading-snug">
                  {post.title}
                </h3>

                <div className="text-xs font-medium text-slate-500">
                  {post.dateStr}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
