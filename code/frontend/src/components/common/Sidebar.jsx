// "use client"

// import React, { useState } from "react"
// import { Link, useLocation } from "react-router-dom"
// import { useAuth } from "../../context/AuthContext"
// import { useTheme } from "../../context/ThemeContext"
// import {
//   DashboardIcon,
//   LeadsIcon,
//   PropertiesIcon,
//   VisitsIcon,
//   TeamIcon,
//   AnalyticsIcon,
//   SettingsIcon,
// } from "../icons/DashboardIcons"

// // Proper Logout SVG Icon - Door with arrow design
// const LogoutIcon = (props) => (
//   <svg
//     {...props}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.5}
//     viewBox="0 0 24 24"
//     className="w-5 h-5"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M7 17L3 12M3 12L7 7M3 12H16.5M10 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H10"
//     />
//   </svg>
// )

// const Sidebar = () => {
//   const location = useLocation()
//   const auth = useAuth()
//   const { theme, setTheme } = useTheme()
//   const userRole = auth.user?.role || "agent"
//   const [, setIsHovered] = useState(false)
//   const [showThemeMenu, setShowThemeMenu] = useState(false)

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard", icon: DashboardIcon, roles: ["admin", "manager", "agent"] },
//     { path: "/dashboard/leads", label: "Leads", icon: LeadsIcon, roles: ["admin", "manager", "agent"] },
//     { path: "/dashboard/properties", label: "Properties", icon: PropertiesIcon, roles: ["admin", "manager", "agent"] },
//     { path: "/dashboard/site-visits", label: "Site Visits", icon: VisitsIcon, roles: ["admin", "manager", "agent"] },
//     { path: "/dashboard/team", label: "Team Management", icon: TeamIcon, roles: ["admin", "manager"] },
//     { path: "/dashboard/analytics", label: "Analytics", icon: AnalyticsIcon, roles: ["admin", "manager"] },
//     { path: "/dashboard/settings", label: "Settings", icon: SettingsIcon, roles: ["admin"] },
//   ]

//   const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

//   const getThemeIcon = () => {
//     switch (theme) {
//       case "light": return "☀️"
//       case "dark": return "🌙"
//       case "auto": return "⚙️"
//       default: return "☀️"
//     }
//   }

//   const handleLogout = () => auth.logout()

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300
//         w-[70px] hover:w-64 group shadow-lg flex flex-col justify-between
//         ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         setIsHovered(false)
//         setShowThemeMenu(false)
//       }}
//     >
//       {/* Top Section (Logo + Profile) */}
//       <div>
//         {/* Logo */}
//         <div className={`h-[70px] flex items-center border-b ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
//           <div className="min-w-[70px] flex items-center justify-center">
//             <img src="/vite.svg" alt="Logo" className="h-7 w-7" />
//           </div>
//           <div className="overflow-hidden">
//             <h1 className="text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               RealEstate CRM
//             </h1>
//           </div>
//         </div>

//         {/* Profile */}
//         <div className={`h-[70px] flex items-center border-b ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
//           <div className="min-w-[70px] flex items-center justify-center">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//               ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-300 text-gray-700"}`}>
//               {auth.user?.username?.[0]?.toUpperCase() || "U"}
//             </div>
//           </div>
//           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <h2 className="text-sm font-medium truncate">{auth.user?.username || "User"}</h2>
//             <p className="text-xs capitalize text-gray-500">{userRole}</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="py-4">
//           {filteredNavItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`h-[50px] flex items-center transition-all duration-200
//                 ${
//                   location.pathname === item.path
//                     ? "bg-blue-600 text-white"
//                     : theme === "dark"
//                       ? "text-gray-300 hover:bg-gray-800 hover:text-white"
//                       : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
//                 }`}
//             >
//               <div className="min-w-[70px] flex items-center justify-center">
//                 {React.createElement(item.icon, { className: "w-5 h-5" })}
//               </div>
//               <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 {item.label}
//               </span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Section (Theme + Logout) */}
//       <div>
//         {/* Theme Toggle */}
//         <div className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
//           <div className="relative">
//             <button
//               onClick={() => setShowThemeMenu(!showThemeMenu)}
//               className={`h-[50px] w-full flex items-center transition-all duration-200
//                 ${theme === "dark" ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-300"}`}
//             >
//               <div className="min-w-[70px] flex items-center justify-center">
//                 <span className="text-xl">{getThemeIcon()}</span>
//               </div>
//               <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
//               </span>
//             </button>

//             {showThemeMenu && (
//               <div className={`absolute bottom-full left-0 mb-1 w-full rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} p-1`}>
//                 {["light", "dark", "auto"].map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setTheme(option)
//                       setShowThemeMenu(false)
//                     }}
//                     className={`w-full px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 transition-all duration-200
//                       ${
//                         theme === option
//                           ? "bg-blue-600 text-white"
//                           : theme === "dark"
//                             ? "text-gray-300 hover:bg-gray-700"
//                             : "text-gray-700 hover:bg-gray-200"
//                       }`}
//                   >
//                     {option.charAt(0).toUpperCase() + option.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Logout */}
//         <div className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
//           <button
//             onClick={handleLogout}
//             className={`h-[50px] w-full flex items-center transition-all duration-200
//               ${theme === "dark" ? "text-gray-300 hover:bg-red-900/20 hover:text-red-400" : "text-gray-700 hover:bg-red-100 hover:text-red-600"}`}
//           >
//             <div className="min-w-[70px] flex items-center justify-center">
//               <LogoutIcon />
//             </div>
//             <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               Logout
//             </span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   )
// }

// export default Sidebar



"use client"

import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import {
  DashboardIcon,
  LeadsIcon,
  PropertiesIcon,
  VisitsIcon,
  TeamIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "../icons/DashboardIcons"

// Proper Logout SVG Icon - Door with arrow design
const LogoutIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 17L3 12M3 12L7 7M3 12H16.5M10 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H10"
    />
  </svg>
)

const Sidebar = () => {
  const location = useLocation()
  const auth = useAuth()
  const { theme } = useTheme()
  const userRole = auth.user?.role || "agent"
  const [, setIsHovered] = useState(false)

  const isDark = theme === "dark"

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: DashboardIcon, roles: ["admin", "manager", "agent"] },
    { path: "/dashboard/leads", label: "Leads", icon: LeadsIcon, roles: ["admin", "manager", "agent"] },
    { path: "/dashboard/properties", label: "Properties", icon: PropertiesIcon, roles: ["admin", "manager", "agent"] },
    { path: "/dashboard/site-visits", label: "Site Visits", icon: VisitsIcon, roles: ["admin", "manager", "agent"] },
    { path: "/dashboard/team", label: "Team Management", icon: TeamIcon, roles: ["admin", "manager"] },
    { path: "/dashboard/analytics", label: "Analytics", icon: AnalyticsIcon, roles: ["admin", "manager"] },
    { path: "/dashboard/settings", label: "Settings", icon: SettingsIcon, roles: ["admin"] },
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  const handleLogout = () => auth.logout()

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300
        w-[70px] hover:w-64 group shadow-lg flex flex-col justify-between
        ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      {/* Top Section (Logo + Profile) */}
      <div>
        {/* Logo */}
        <div className={`h-[70px] flex items-center border-b ${isDark ? "border-gray-800" : "border-gray-300"}`}>
          <div className="min-w-[70px] flex items-center justify-center">
            <img src="/vite.svg" alt="Logo" className="h-7 w-7" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              RealEstate CRM
            </h1>
          </div>
        </div>

        {/* Profile */}
        <div className={`h-[70px] flex items-center border-b ${isDark ? "border-gray-800" : "border-gray-300"}`}>
          <div className="min-w-[70px] flex items-center justify-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-300 text-gray-700"}`}
            >
              {auth.user?.username?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-sm font-medium truncate">{auth.user?.username || "User"}</h2>
            <p className="text-xs capitalize text-gray-500">{userRole}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`h-[50px] flex items-center transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : isDark
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                }`}
            >
              <div className="min-w-[70px] flex items-center justify-center">
                {React.createElement(item.icon, { className: "w-5 h-5" })}
              </div>
              <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section (Logout) */}
      <div>
        {/* Logout */}
        <div className={`border-t ${isDark ? "border-gray-800" : "border-gray-300"}`}>
          <button
            onClick={handleLogout}
            className={`h-[50px] w-full flex items-center transition-all duration-200
              ${isDark ? "text-gray-300 hover:bg-red-900/20 hover:text-red-400" : "text-gray-700 hover:bg-red-100 hover:text-red-600"}`}
          >
            <div className="min-w-[70px] flex items-center justify-center">
              <LogoutIcon />
            </div>
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
