import React from "react";
import { RoomsTopBar } from "./RoomsTopBar";
import { RoomsCards } from "./RoomsCards";
import { RoomsTable } from "./RoomsTable";

const RoomsPage = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
        <RoomsTopBar />
      <div className="p-6 space-y-6">
        <RoomsCards />
        <RoomsTable />
      </div>
    </div>
  );
};

export default RoomsPage;