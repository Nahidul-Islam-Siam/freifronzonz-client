// app/(adminDashboard)/layout.tsx (or wherever your SuperAdminLayout is)

"use client";

import AdminLayout from "@/components/shared/layout/Layout";
import Link from "next/link";
import { ReactNode } from "react";

import { RiContactsBook2Line } from "react-icons/ri";
import { FaUsers, FaCalendarAlt, FaBox, FaCalendarCheck, FaMoneyBillWave, FaUserCog, FaCogs, FaSignOutAlt } from "react-icons/fa";

// Import getItem function (assuming it's from your existing code)
import { getItem, MenuItem } from "../Layout";

const navItems: MenuItem[] = [
  getItem(
    <Link href="/dashboard">Dashboards</Link>,
    "/dashboard",
    <FaUsers className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/order-list">Order List</Link>,
    "/dashboard/order-list",
    <FaCalendarAlt className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/all-product">All Product</Link>,
    "/dashboard/all-product",
    <FaBox className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/event">Events</Link>,
    "/dashboard/event",
    <FaCalendarCheck className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/payment-list">Payment List</Link>,
    "/dashboard/payment-list",
    <FaMoneyBillWave className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/user">User</Link>,
    "/dashboard/user",
    <FaUserCog className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/contact-request">Contact Request</Link>,
    "/dashboard/contact-request",
    <RiContactsBook2Line className="text-xl" />
  ),
  getItem(
    <Link href="/dashboard/setting">Setting</Link>,
    "/dashboard/setting",
    <FaCogs className="text-xl" />
  ),
  getItem(
    <Link href="/auth/logout">Log out</Link>,
    "/auth/logout",
    <FaSignOutAlt className="text-xl" />
  ),
];

const SuperAdminLayout = ({ children }: { children: ReactNode }) => {
  return <AdminLayout menu={navItems}>{children}</AdminLayout>;
};

export default SuperAdminLayout;