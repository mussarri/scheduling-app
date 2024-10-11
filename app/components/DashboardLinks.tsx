"use client";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CalendarHeart,
  Home,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface dashboardLinks {
  id: number;
  name: string;
  href: string;
  icon: any;
}

const dashboardLinks: dashboardLinks[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: 0,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users,
  },
  {
    id: 0,
    name: "Availabity",
    href: "/dashboard/availabity",
    icon: CalendarCheck,
  },
  {
    id: 0,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardLinks = () => {
  const pathname = usePathname();
  return (
    <div className="p-3">
      {dashboardLinks.map((item) => (
        <Link
          href={item.href}
          className={
            "flex gap-2 items-center p-3 rounded-lg " +
            cn(
              pathname === item.href
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary"
            )
          }
        >
          {<item.icon className={"size-4"}></item.icon>}
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DashboardLinks;
