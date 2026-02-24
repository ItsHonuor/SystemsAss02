import React from "react";
import { KitchenTopBar } from "./KitchenTopBar";
import { KitchenCards } from "./KitchenCards";
import { KitchenMenu } from "./KitchenMenu";

const KitchenPage = () => {
    return (
        <div className="bg-stone-50 min-h-screen">
        <KitchenTopBar />
        <div className="p-6 space-y-6">
            <KitchenCards />
            <KitchenMenu />
        </div>
        </div>
    );
    };

export default KitchenPage;