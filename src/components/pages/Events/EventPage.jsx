/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useMemo } from 'react';
import { useGetEventListQuery } from '@/redux/service/admin/eventApi';
import EventList from './EventList';

export default function EventPage() {
  const [activeTab, setActiveTab] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: events, isLoading } = useGetEventListQuery();

  const today = new Date();

  const { recentEvents, upcomingEvents } = useMemo(() => {
    const allEvents = events?.data?.products || [];

    const recent = [];
    const upcoming = [];

    allEvents.forEach((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      if (end < today) {
        recent.push(event);
      } else if (start >= today) {
        upcoming.push(event);
      }
    });

    return { recentEvents: recent, upcomingEvents: upcoming };
  }, [events]);

  if (isLoading) {
    return <div className="text-center py-20">Loading events...</div>;
  }

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Search & Tabs */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-[#9E845C] focus:ring-2 focus:ring-[#AF6900]"
            />
            <button className="absolute right-0 top-0 bottom-0 px-8 bg-[#AF6900] text-white">
              Find Events
            </button>
          </div>

          <div className="flex space-x-2">
            {['recent', 'upcoming'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 ${
                  activeTab === tab
                    ? 'bg-[#AF6900] text-white'
                    : 'border border-[#AF6900] text-[#AF6900]'
                }`}
              >
                {tab === 'recent' ? 'Recent' : 'Upcoming'}
              </button>
            ))}
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center my-8">
          {activeTab === 'recent' ? 'Recent Events' : 'Upcoming Events'}
        </h2>

        {/* Content */}
        {activeTab === 'recent' && (
          <EventList events={recentEvents} searchTerm={searchTerm} />
        )}

        {activeTab === 'upcoming' && (
          <EventList events={upcomingEvents} searchTerm={searchTerm} />
        )}
      </div>
    </section>
  );
}
