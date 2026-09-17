import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Award,
  ExternalLink,
  MessageSquareQuote
} from 'lucide-react';
import { CLIENT_LOGOS, GOOGLE_REVIEWS, COMPLETED_JOBS } from '../../data/seedData';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Client Logos Strip */}
        <div className="space-y-6 text-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
              TRUSTED BY NIGERIA&apos;S LEADING ENTERPRISES, FINTECHS & INSTITUTIONS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                className="bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-[11px] font-bold text-stone-800 mt-2 truncate w-full">
                  {client.name}
                </div>
                <div className="text-[9px] text-stone-500 truncate w-full">
                  {client.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Google Reviews Widget Showcase */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs">
                {/* Google "G" representation */}
                <div className="text-2xl font-black bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
                  G
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                    Google Customer Reviews
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Verified Store
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-stone-900">4.9 / 5.0</span>
                  <span className="text-xs text-stone-500">• 328+ corporate ratings</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-500 hidden sm:inline">
                Verified printing orders delivered in Lagos & Abuja
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>100% Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                      {rev.avatarText}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{rev.author}</h4>
                      <p className="text-[10px] text-stone-500">{rev.company} • {rev.city}</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium hidden sm:inline">
                    Verified Job
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Completed Jobs & Press Showcase */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600">
                RECENT COMMERCIAL PROJECTS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-1">
                Completed Jobs Fresh Off Our Production Press
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              Printed in Somolu & Ikeja, delivered nationwide
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPLETED_JOBS.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={job.imageUrl}
                      alt={job.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-xs">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-bold text-stone-900 text-sm">{job.title}</h4>
                    <p className="text-[11px] text-amber-700 font-medium">{job.client}</p>
                    <p className="text-[10px] text-stone-500 line-clamp-2">{job.specs}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {job.location}
                  </span>
                  <span className="text-[#b8860b] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Delivered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
