import React from "react";
import Welcome from "@/components/welcome";
import ResinTask from "@/components/resin-task";
import TodaysDomains from "@/components/todays-domain";
import AppLayout from "@/components/layouts/app";

export default function Home() {
  return (
    <AppLayout>
      <Welcome/>
      <ResinTask/>
      <TodaysDomains/>
    </AppLayout>
  );  
}