import React from 'react'
import { TopBar } from './TopBar'
import Grid from "./Grid";
import RevenueChart from "./RevenueChart";
import RoomPopularityChart from "./RoomPopularityChart";
import RecentBookings from './RecentBookings';
import OccupancyStats from './OccupancyStats';

export const Dashboard = () => {
  return (
    <div className="bg-stone-50 rounded-lg pb-4 shadow">
      <TopBar />
      <Grid />
      <div className="col-span-12 grid grid-cols-12 gap-4 px-4">
        <div className="col-span-8">
          <RevenueChart />
        </div>
        <div className="col-span-4">
          <RoomPopularityChart />
        </div>
      </div>
      <div className="col-span-12 mt-4"><RecentBookings /></div>
      <div className="col-span-4"><OccupancyStats /></div>
    </div>
  );
};