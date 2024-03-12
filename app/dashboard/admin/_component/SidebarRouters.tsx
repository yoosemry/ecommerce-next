"use client";
import { CarrotIcon, ListOrderedIcon, ShoppingBag, UsersIcon } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";

const routes = [
    {
        id: 1,
        icon: CarrotIcon,
        label: "Product",
        href: "/product",
    },
    {
        id: 1,
        icon: ShoppingBag,
        label: "Category",
        href: "/category",
    },
    {
        id: 1,
        icon: UsersIcon,
        label: "User",
        href: "/user",
    },
    {
        id: 1,
        icon: ListOrderedIcon,
        label: "Order",
        href: "/order",
    }
];

const SidebarRouters = () => {
    return <div>

        {
            routes.map((route, index) => (

                <SidebarItem
                    key={route.id}
                    id={route.id}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))
        }

    </div>;
};

export default SidebarRouters;
