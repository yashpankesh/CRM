import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend as RechartsLegend, ResponsiveContainer, LineChart, Line 
} from "recharts";
import { 
  Calendar, 
  Users, 
  Home, 
  CheckCircle, 
  XCircle, 
  Clock 
} from "lucide-react";
import Navbar from "../components/common/Navbar"; 

// Mock data - replace with actual API calls
const visitData = [
  { date: "2024-01", scheduled: 45, completed: 38, cancelled: 7 },
  { date: "2024-02", scheduled: 52, completed: 45, cancelled: 7 },
  { date: "2024-03", scheduled: 48, completed: 40, cancelled: 8 },
  { date: "2024-04", scheduled: 60, completed: 52, cancelled: 8 },
  { date: "2024-05", scheduled: 55, completed: 48, cancelled: 7 },
];

const upcomingVisits = [
  {
    id: 1,
    property: "Sunset Villa",
    client: "John Smith",
    date: "2024-05-16",
    time: "10:00 AM",
    status: "scheduled",
  },
  {
    id: 2,
    property: "Ocean View Apartment",
    client: "Sarah Johnson",
    date: "2024-05-16",
    time: "2:30 PM",
    status: "confirmed",
  },
  {
    id: 3,
    property: "Mountain Lodge",
    client: "Mike Brown",
    date: "2024-05-17",
    time: "11:00 AM",
    status: "scheduled",
  },
];

function SiteVisits() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-gray-100" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const hoverBg = isDark ? "hover:bg-gray-700" : "hover:bg-gray-50";

  const stats = [
    {
      title: "Total Visits",
      value: "183",
      icon: Home,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: "145",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: "38",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Upcoming",
      value: "24",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`${bgColor} rounded-xl shadow-sm p-4 md:p-6 border ${borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {stat.title}
                  </p>
                  <p className={`text-xl md:text-2xl font-semibold mt-2 ${textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-7 h-7 md:w-8 md:h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Visits Chart */}
        <div className={`${bgColor} rounded-xl shadow-sm p-4 md:p-6 border ${borderColor}`}>
          <h2 className={`text-lg font-semibold mb-4 md:mb-6 ${textColor}`}>Visit Trends</h2>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f3f4f6"} />
                <XAxis dataKey="date" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                  labelStyle={{ color: isDark ? "#F3F4F6" : "#111827" }}
                />
                <RechartsLegend />
                <Bar dataKey="scheduled" name="Scheduled" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancelled" name="Cancelled" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Visits */}
        <div className={`${bgColor} rounded-xl shadow-sm p-4 md:p-6 border ${borderColor}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className={`text-lg font-semibold ${textColor}`}>Upcoming Visits</h2>
            <div className="flex w-full sm:w-auto">
              <button
                onClick={() => setSelectedTab("upcoming")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedTab === "upcoming"
                    ? "bg-blue-600 text-white"
                    : `${isDark ? "text-gray-400" : "text-gray-600"} ${hoverBg}`
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setSelectedTab("past")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2
                  ${selectedTab === "past"
                    ? "bg-blue-600 text-white"
                    : `${isDark ? "text-gray-400" : "text-gray-600"} ${hoverBg}`
                  }`}
              >
                Past
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {upcomingVisits.map((visit) => (
              <div
                key={visit.id}
                className={`py-4 ${hoverBg} -mx-4 md:-mx-6 px-4 md:px-6 cursor-pointer transition-colors`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                  <div className="space-y-1">
                    <p className={`font-medium ${textColor}`}>{visit.property}</p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {visit.client}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className={`font-medium ${textColor}`}>{visit.date}</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {visit.time}
                    </p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <span
                      className={`block w-full sm:w-auto text-center px-3 py-1 rounded-full text-xs font-medium
                        ${visit.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteVisits;
