import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Tag } from 'lucide-react';

interface BlogPostItem {
  id: string;
  title: string;
  image: string;
  category1: string;
  category2: string;
  day: string;
  month: string;
  authorName: string;
  authorAvatar: string;
  dateStr: string;
}

const BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    title: "What's the Main Challange of Printing Service",
    image: '/brochures-event-programs-flyers.jpg',
    category1: 'Printing',
    category2: 'Agency',
    day: '15',
    month: 'Mar',
    authorName: 'Janes Cooper',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    dateStr: 'August 3, 2026',
  },
  {
    id: 'post-2',
    title: 'Best 3D Printing Modern Equipment Team',
    image: '/corrugated-shipping-cartons-mailer-boxes.jpg',
    category1: 'Printing',
    category2: 'Agency',
    day: '15',
    month: 'Mar',
    authorName: 'Laila Veni',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    dateStr: 'August 3, 2026',
  },
  {
    id: 'post-3',
    title: 'Modern Civilization Based on the Digital Printing',
    image: '/industrial-large-format-printer.jpg',
    category1: 'Printing',
    category2: 'Agency',
    day: '15',
    month: 'Mar',
    authorName: 'Anne Marry',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    dateStr: 'August 3, 2026',
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
      className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header: Centered */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-mono font-bold text-teal-700 uppercase tracking-widest">
            BLOG &amp; INSIGHTS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
            Read Our Latest Blog Post
          </h2>
        </div>

        {/* 3-Column Responsive Grid (Presvila Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-teal-500/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl flex flex-col group transition-all duration-300"
            >
              {/* Image Preview with Date Badge */}
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Date Badge: e.g. "15 Mar" */}
                <div className="absolute bottom-3 right-3 bg-teal-700 text-white rounded-lg px-2.5 py-1 text-center shadow-md">
                  <div className="text-sm font-black leading-none">{post.day}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">{post.month}</div>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Category Chips */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {post.category1}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {post.category2}
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Author Metadata Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {post.authorName}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {post.dateStr}
                    </div>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
