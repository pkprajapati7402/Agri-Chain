"use client";
import { useState, useEffect } from "react";

export function FarmerSuccessStories() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Ramesh Kumar",
      location: "Maharashtra",
      crop: "Cotton",
      image: "👨‍🌾",
      story: "With the loan from Kisan Kosh, I was able to pay for my daughter's school fees without selling my cotton early. I sold it three months later and made 40% more profit.",
      profit: "40% more profit",
      amount: "₹2.5 Lakhs",
      duration: "3 months",
      rating: 5,
      verified: true
    },
    {
      name: "Priya Singh",
      location: "Punjab",
      crop: "Wheat",
      image: "👩‍🌾",
      story: "The process was so simple and fast. I got the money in my account the same day. This is the future for farmers like me.",
      profit: "Same day funding",
      amount: "₹1.8 Lakhs",
      duration: "4 months",
      rating: 5,
      verified: true
    },
    {
      name: "Suresh Patel",
      location: "Gujarat",
      crop: "Groundnut",
      image: "👨‍🌾",
      story: "Traditional banks would take weeks and ask for so many documents. With Kisan Kosh, I got my loan in 15 minutes using just my warehouse receipt. Amazing technology!",
      profit: "15 min approval",
      amount: "₹3.2 Lakhs",
      duration: "6 months",
      rating: 5,
      verified: true
    },
    {
      name: "Lakshmi Devi",
      location: "Andhra Pradesh",
      crop: "Rice",
      image: "👩‍🌾",
      story: "I was worried about the harvest season prices being too low. Kisan Kosh gave me the flexibility to wait for better market rates. I earned 35% more than expected.",
      profit: "35% extra income",
      amount: "₹4.1 Lakhs",
      duration: "5 months",
      rating: 5,
      verified: true
    }
  ];

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-primary-dark to-emerald-900/20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-yellow-400/30 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-400/40 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-blue-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-6">
            <div className="bg-green-500/20 rounded-full p-3">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 via-accent-green to-emerald-300 bg-clip-text text-transparent">
            Empowering Farmers Across India
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Real stories from real farmers who have transformed their agricultural business with Kisan Kosh. Join thousands who are already maximizing their profits.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-3xl p-8 lg:p-10">
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">{testimonials[activeTestimonial].image}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-white">{testimonials[activeTestimonial].name}</h3>
                    {testimonials[activeTestimonial].verified && (
                      <div className="bg-green-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-accent-green font-medium">{testimonials[activeTestimonial].location}</p>
                  <p className="text-gray-400 text-sm">{testimonials[activeTestimonial].crop} Farmer</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <div className="text-6xl text-accent-green/20 absolute -top-4 -left-2">"</div>
                <p className="text-lg text-gray-200 leading-relaxed pl-6 italic">
                  {testimonials[activeTestimonial].story}
                </p>
                <div className="text-6xl text-accent-green/20 absolute -bottom-8 right-0 rotate-180">"</div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-accent-green font-bold text-lg">{testimonials[activeTestimonial].profit}</div>
                  <div className="text-gray-400 text-xs">Achievement</div>
                </div>
                <div className="text-center">
                  <div className="text-accent-green font-bold text-lg">{testimonials[activeTestimonial].amount}</div>
                  <div className="text-gray-400 text-xs">Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-accent-green font-bold text-lg">{testimonials[activeTestimonial].duration}</div>
                  <div className="text-gray-400 text-xs">Duration</div>
                </div>
              </div>
            </div>

            {/* Stats & Impact */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "15,000+", label: "Happy Farmers", icon: "👨‍🌾" },
                  { number: "₹500Cr+", label: "Loans Disbursed", icon: "💰" },
                  { number: "98.5%", label: "Success Rate", icon: "📈" },
                  { number: "45%", label: "Avg. Profit Increase", icon: "🎯" }
                ].map((stat, index) => (
                  <div key={index} className="backdrop-blur-sm bg-accent-green/10 border border-accent-green/20 rounded-2xl p-6 text-center hover:bg-accent-green/20 transition-all duration-300 cursor-pointer group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-accent-green mb-1 group-hover:text-green-300 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Testimonial Placeholder */}
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-accent-green/20 to-blue-500/20 rounded-xl cursor-pointer group hover:from-accent-green/30 hover:to-blue-500/30 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">▶️</div>
                    <p className="text-white font-medium">Watch Video Testimonials</p>
                    <p className="text-gray-400 text-sm">Real farmers sharing their experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center items-center space-x-6">
          {/* Previous Button */}
          <button 
            onClick={() => {
              setIsAutoPlaying(false);
              setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
            }}
            className="p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            suppressHydrationWarning={true}
          >
            <span className="text-accent-green">←</span>
          </button>

          {/* Dots */}
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveTestimonial(index);
                }}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${activeTestimonial === index 
                    ? 'bg-accent-green scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                  }
                `}
                suppressHydrationWarning={true}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={() => {
              setIsAutoPlaying(false);
              setActiveTestimonial(prev => (prev + 1) % testimonials.length);
            }}
            className="p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            suppressHydrationWarning={true}
          >
            <span className="text-accent-green">→</span>
          </button>

          {/* Auto-play toggle */}
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`
              p-3 backdrop-blur-sm border rounded-full transition-all duration-300 hover:scale-110
              ${isAutoPlaying 
                ? 'bg-accent-green/20 border-accent-green/50 text-accent-green' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            `}
            suppressHydrationWarning={true}
          >
            <span>{isAutoPlaying ? '⏸️' : '▶️'}</span>
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-accent-green/10 to-emerald-500/10 border border-accent-green/20 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Be the next farmer to maximize profits and transform your agricultural business with Kisan Kosh.
            </p>
            <button 
              className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-10 py-4 rounded-full font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-green/25 text-lg"
              suppressHydrationWarning={true}
            >
              Start Your Success Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}