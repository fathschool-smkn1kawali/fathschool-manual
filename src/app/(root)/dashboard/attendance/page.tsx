"use client";

import { Hero } from "@/components/dashboard/attendance/Hero";
import { JSX } from "react";

/**
 * * This is a strongly typed React Functional Component that renders a dashboard attendance page.
 *
 * @returns {JSX.Element} A DashboardAttendance component.
 */
export default function Attendance(): JSX.Element {
  return (
    <main>
      <Hero />

      {/* Glassmorphism  */}
      <div className="absolute top-1/4 left-1/2 -z-50 w-96 h-96 bg-gradient-to-r from-purple-400/70 to-blue-500/70 rounded-full blur-3xl opacity-40 dark:opacity-30"/>
      <div className="absolute bottom-1/4 right-1/2 -z-50 w-96 h-96 bg-gradient-to-r from-pink-500/70 to-yellow-500/70 rounded-full blur-3xl opacity-40 dark:opacity-30"/>
    </main>
  );
}