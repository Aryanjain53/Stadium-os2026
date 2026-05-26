"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Video, ShieldAlert, Car } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Digital Twin", path: "/", icon: <Monitor size={20} /> },
    { name: "CCTV Analytics", path: "/cctv", icon: <Video size={20} /> },
    { name: "Emergency", path: "/emergency", icon: <ShieldAlert size={20} /> },
    { name: "Smart Parking", path: "/parking", icon: <Car size={20} /> },
  ];

  const isUserPortal = pathname && pathname.startsWith('/user');
  const filteredNavItems = isUserPortal 
    ? navItems.filter(item => item.name === 'Digital Twin')
    : navItems;

  return (
    <nav className="global-nav">
      <div className="nav-logo">
        <div className="logo-glow"></div>
        <span>OS</span>
      </div>
      <div className="nav-links">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-text">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
