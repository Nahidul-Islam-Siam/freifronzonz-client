// components/RecentEvents.jsx
'use client';
import React from 'react';
import EventList from './EventList';

export default function RecentEvents({ searchTerm }: { searchTerm: string }) {
  // Mock data for RECENT events
  const recentEvents = [
    {
      id: 1,
      title: "Wine Garden Tour",
      date: "December 24, 2024 - December 25, 2024",
      audienceSize: 100,
      price: 199,
      image: "/images/events.png",
      description:
        "Lorem ipsum dolor sit amet, adipiscing consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
      id: 2,
      title: "Wine Tasting Masterclass",
      date: "December 20, 2024 - December 22, 2024",
      audienceSize: 50,
      price: 250,
      image: "/images/events.png",
      description:
        "Join our expert sommelier for an immersive journey through the world of fine wines. Taste rare vintages and learn about pairing techniques.",
    },
    {
      id: 3,
      title: "Harvest Festival Celebration",
      date: "December 15, 2024 - December 17, 2024",
      audienceSize: 200,
      price: 99,
      image: "/images/events.png",
      description:
        "Celebrate the season with live music, local food vendors, and family-friendly activities amidst the beautiful vineyards.",
    },
  ];

  return <EventList events={recentEvents} searchTerm={searchTerm} />;
}