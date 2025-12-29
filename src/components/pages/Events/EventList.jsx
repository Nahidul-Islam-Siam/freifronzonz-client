'use client';
import React from "react";
import Image from "next/image";

export default function EventList({ events = [], searchTerm = '' }) {

  // ✅ Safe filtering
  const filteredEvents = events.filter(event =>
    event?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event?.des?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="flex flex-col sm:flex-row gap-6 p-6 border border-[#000000] rounded-[18px] shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Left Content */}
          <div className="sm:w-1/2 flex justify-between flex-col">
            <div>
              {/* Date */}
              <div className="md:text-xl text-lg font-normal text-[#9E845C]">
                {new Date(event.startDate).toDateString()} –{" "}
                {new Date(event.endDate).toDateString()}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-abhaya font-extrabold text-[#000000]">
                {event.name}
              </h3>

              {/* Audience */}
              <div className="flex items-center gap-2 text-xs md:text-base text-[#968F8F] font-normal">
                Audience size: {event.audienceSize}
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-[#968F8F] font-medium line-clamp-3">
                {event.des}
              </p>
            </div>

            {/* Price & Button */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl md:text-3xl font-extrabold font-abhaya text-[#AF6900]">
                ${event.price}
                <span className="text-sm font-medium text-[#482817]">
                  {" "} (1 person)
                </span>
              </span>

              <button className="px-4 py-2 text-[#AF6900] border border-[#AF6900] rounded-lg font-medium hover:bg-[#AF6900] hover:text-white transition-colors">
                Join Now
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="sm:w-1/2 relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={ "/images/events.png"}
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500">No events found</p>
      )}
    </div>
  );
}
