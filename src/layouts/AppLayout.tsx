import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

import logo_mtec from "../assets/logo/Logo_M-tec_telematics.png";

import DashboardIcon from "../icons/DashboardIcon";
import UsersIcon from "../icons/UsersIcon";
import TourIcon from "../icons/TourIcon";
import CubeIcon from "../icons/CubeIcon";

import { useI18n } from "../context/AppContext";
import { SidebarItem } from "../components/ui/sidebarItem";
import { useState } from "react";

export default function AppLayout() {

    const [search, setSearch] = useState("");
    const { translator } = useI18n();

    const items = [
        {
            to: "/dashboard",
            label: translator("dashboard"),
            icon: DashboardIcon,
        },
        {
            to: "/users",
            label: translator("users"),
            icon: UsersIcon,
        },
        {
            to: "/tour",
            label: translator("tour"),
            icon: TourIcon,
        },
        {
            to: "/delivery",
            label: translator("delivery"),
            icon: CubeIcon,
        }
    ];

    return (
        <div className="flex h-screen">

            <Sidebar logo={logo_mtec}>
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <SidebarItem
                            to={item.to}
                            key={item.label}
                            icon={
                                <Icon
                                    size="22"
                                    strokeWidth="1.5"
                                />
                            }
                            text={item.label}
                        />
                    );
                })}
            </Sidebar>

            <div className="flex flex-1 min-w-0 flex-col">

                <Topbar search={search} setSearch={setSearch}/>

                <main className="flex-1 overflow-auto">
                    <Outlet  context={{ search }}/>
                </main>

            </div>

        </div>
    );
}