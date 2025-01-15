"use client";

import { Hero } from "@/components/dashboard/attendance/Hero";
import { useCheckById } from "@/lib/hooks/useAttendance";
import { useGetSettings } from "@/lib/hooks/useGetSettings";
import { capitalizeWords } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * * This is a strongly typed React Functional Component that renders a dashboard attendance page.
 *
 * @returns {React.ReactElement} A DashboardAttendance component.
 */
export default function Attendance(): React.ReactElement {
  const { data: dataSettings } = useGetSettings();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ name: string, id: number } | null>(null);

  const { data: dataCheck } = useCheckById(user?.id ? user.id.toString() : null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("user");
      const parsedUser = userData ? JSON.parse(userData) : null;

      if (!parsedUser) {
        window.location.href = "/";
        return;
      }

      setUser(parsedUser);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="min-h-[600px] flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-[600px]">
      <Hero
        actions={{ In: dataCheck?.data?.checkedin, Out: dataCheck?.data?.checkedout }}
        greeting={{
          nameUser: capitalizeWords(user?.name ?? "User"),
          description: dataSettings?.data.data.mobile_settings.conclusion_apps,
        }}
      />

      {/* Glassmorphism */}
      <div className="absolute top-1/4 left-1/2 -z-50 w-96 h-96 bg-gradient-to-r from-purple-400/70 to-blue-500/70 rounded-full blur-3xl opacity-40 dark:opacity-30" />
      <div className="absolute bottom-1/4 right-1/2 -z-50 w-96 h-96 bg-gradient-to-r from-pink-500/70 to-yellow-500/70 rounded-full blur-3xl opacity-40 dark:opacity-30" />
    </main>
  );
}
