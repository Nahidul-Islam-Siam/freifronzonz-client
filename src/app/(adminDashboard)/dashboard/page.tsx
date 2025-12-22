// app/page.tsx
"use client";

import RecentBookingsTable from "@/components/Dashboard/RecentBookingsTable";
import RevenueChart from "@/components/Dashboard/RevenueChart";
import StatCards from "@/components/Dashboard/StatCards";
import { useState } from "react";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#F4F7FD] p-10">
      {/* Stat Cards */}
      <div className="mb-6">
        <StatCards />
      </div>

      {/* Revenue Chart */}
      <div className="mb-10">
        <RevenueChart />
      </div>

      {/* Recent Bookings Table */}
      <div>
        <RecentBookingsTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}