/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useMemo } from 'react';
import { useGetEventListQuery } from '@/redux/service/admin/eventApi';
import EventList from './EventList';

export default function EventPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: events, isLoading } = useGetEventListQuery();

  const today = new Date();

  const { recentEvents, upcomingEvents, showTabs } = useMemo(() => {
    const allEvents = events?.data?.products || [];

    const recent = [];
    const upcoming = [];

    allEvents.forEach((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      if (end < today) {
        recent.push(event);
      } else {
        upcoming.push(event);
      }
    });

    // ✅ Show tabs only if BOTH recent and upcoming events exist
    const shouldShowTabs = recent.length > 0 && upcoming.length > 0;

    return { 
      recentEvents: recent, 
      upcomingEvents: upcoming,
      showTabs: shouldShowTabs
    };
  }, [events]);

  // ✅ Auto-determine which events to show
  const currentView = useMemo(() => {
    if (showTabs) {
      // If tabs are visible, default to 'upcoming'
      return 'upcoming';
    } else if (upcomingEvents.length > 0) {
      return 'upcoming';
    } else {
      return 'recent';
    }
  }, [showTabs, upcomingEvents, recentEvents]);

  const eventsToDisplay = currentView === 'upcoming' ? upcomingEvents : recentEvents;

  if (isLoading) {
    return <div className="text-center py-20">Loading events...</div>;
  }

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-24 py-4 border border-[#9E845C] focus:ring-2 focus:ring-[#AF6900] rounded-lg"
            />
            <button className="absolute right-0 top-0 bottom-0 px-6 bg-[#AF6900] text-white rounded-r-lg">
              Find Events
            </button>
          </div>
        </div>

        {/* Conditionally Render Tabs */}
        {showTabs && (
          <div className="mb-8">
            <div className="flex space-x-2">
              {['recent', 'upcoming'].map((tab) => (
                <button
                  key={tab}
                  // For now, we auto-show upcoming, but you can add state if needed later
                  className={`px-6 py-3 rounded-lg ${
                    currentView === tab
                      ? 'bg-[#AF6900] text-white'
                      : 'border border-[#AF6900] text-[#AF6900]'
                  }`}
                  disabled // Tabs are for display only since we auto-select
                >
                  {tab === 'recent' ? 'Recent' : 'Upcoming'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center my-8">
          {upcomingEvents.length > 0 && recentEvents.length === 0 
            ? 'Upcoming Events' 
            : recentEvents.length > 0 && upcomingEvents.length === 0
              ? 'Recent Events'
              : 'Events'}
        </h2>

        {/* Event List */}
        <EventList 
          events={eventsToDisplay} 
          searchTerm={searchTerm} 
        />
      </div>
    </section>
  );
}