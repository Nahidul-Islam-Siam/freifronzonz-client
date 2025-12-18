// components/UpcomingEvents.jsx
'use client';
import React from 'react';
import EventList from './EventList';

export default function UpcomingEvents({ searchTerm }) {
  // Mock data for UPCOMING events (dates after today)
  const upcomingEvents = [
    {
      id: 1,
      title: "New Year's Eve Gala",
      date: "December 31, 2025 - January 1, 2026",
      audienceSize: 300,
      price: 499,
      image: "/images/events.png",
      description:
        "Ring in the New Year with elegance and style! Enjoy gourmet dining, live entertainment, and a spectacular fireworks display over the vineyards.",
    },
    {
      id: 2,
      title: "Spring Vineyard Walk",
      date: "March 15, 2026 - March 16, 2026",
      audienceSize: 150,
      price: 150,
      image: "/images/events.png",
      description:
        "Experience the beauty of the vineyards in bloom. Guided tours, wine tastings, and picnic lunches under the spring sun.",
    },
    {
      id: 3,
      title: "Summer Wine & Jazz Festival",
      date: "July 10, 2026 - July 12, 2026",
      audienceSize: 500,
      price: 120,
      image: "/images/events.png",
      description:
        "Relax to the sounds of smooth jazz while sipping award-winning wines. Local artisans, food trucks, and evening concerts.",
    },
  ];

  return <EventList events={upcomingEvents} searchTerm={searchTerm} />;
}