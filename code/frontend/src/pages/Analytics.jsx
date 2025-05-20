// import React, { useState } from 'react';
// import { useTheme } from "../context/ThemeContext";
// import {
//   LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
//   Legend as RechartsLegend, ResponsiveContainer
// } from "recharts";
// import {
//   TrendingUp,
//   Home,
//   CalendarCheck,
//   Percent,
//   IndianRupee
// } from "lucide-react";
// import Navbar from "../components/common/Navbar";

// // Format number to Indian currency
// const formatIndianPrice = (value) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0
//   }).format(value);
// };

// // Mock Data
// const salesData = [
//   { month: "Jan", revenue: 3750000, deals: 12 },
//   { month: "Feb", revenue: 4300000, deals: 15 },
//   { month: "Mar", revenue: 3950000, deals: 14 },
//   { month: "Apr", revenue: 5100000, deals: 18 },
//   { month: "May", revenue: 4600000, deals: 16 },
// ];



// const performanceData = [
//   { agent: "John Doe", deals: 24, revenue: 72500000 },
//   { agent: "Jane Smith", deals: 22, revenue: 65000000 },
//   { agent: "Mike Johnson", deals: 18, revenue: 51500000 },
//   { agent: "Sarah Wilson", deals: 16, revenue: 48500000 },
//   { agent: "Tom Brown", deals: 15, revenue: 45000000 },
// ];

// const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// function Analytics() {
//   const { theme } = useTheme();
//   const [timeRange, setTimeRange] = useState("month");

//   const isDark = theme === "dark";
//   const bgColor = isDark ? "bg-gray-800" : "bg-white";
//   const textColor = isDark ? "text-gray-100" : "text-gray-800";
//   const borderColor = isDark ? "border-gray-700" : "border-gray-200";
//   const secondaryText = isDark ? "text-gray-400" : "text-gray-500";

//   const kpiCards = [
//     {
//       title: "Total Revenue",
//       value: formatIndianPrice(21700000),
//       change: "+12.5%",
//       icon: IndianRupee,
//       trend: "up",
//     },
//     {
//       title: "Properties Sold",
//       value: "75",
//       change: "+8.2%",
//       icon: Home,
//       trend: "up",
//     },
//     {
//       title: "Site Visits",
//       value: "183",
//       change: "+15.3%",
//       icon: CalendarCheck,
//       trend: "up",
//     },
//     {
//       title: "Conversion Rate",
//       value: "20.8%",
//       change: "+2.4%",
//       icon: Percent,
//       trend: "up",
//     },
//   ];

//   return (
//     <>
//       <Navbar /> {/* No wrapper to avoid white space above */}
//       <div className="p-6 space-y-6">
//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {kpiCards.map((card) => (
//             <div
//               key={card.title}
//               className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className={secondaryText}>{card.title}</p>
//                   <p className={`text-2xl font-semibold mt-2 ${textColor}`}>
//                     {card.value}
//                   </p>
//                   <div className="flex items-center mt-2">
//                     <TrendingUp
//                       className={`w-4 h-4 ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}
//                     />
//                     <span className={`ml-1 text-sm ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
//                       {card.change}
//                     </span>
//                   </div>
//                 </div>
//                 <card.icon className={`w-8 h-8 ${secondaryText}`} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Revenue & Deals Chart */}
//         <div className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className={`text-lg font-semibold ${textColor}`}>Revenue & Deals</h2>
//             <div className="flex space-x-2">
//               {["week", "month", "year"].map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => setTimeRange(range)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
//                     ${timeRange === range
//                       ? "bg-blue-600 text-white"
//                       : `${isDark ? "text-gray-400" : "text-gray-600"} hover:bg-gray-100 dark:hover:bg-gray-700`
//                     }`}
//                 >
//                   {range.charAt(0).toUpperCase() + range.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={salesData}>
//               <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f3f4f6"} />
//               <XAxis dataKey="month" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
//               <YAxis
//                 yAxisId="left"
//                 stroke={isDark ? "#9CA3AF" : "#6B7280"}
//                 tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
//               />
//               <YAxis yAxisId="right" orientation="right" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
//               <RechartsTooltip
//                 contentStyle={{
//                   backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
//                   border: "none",
//                   borderRadius: "8px",
//                   boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//                 }}
//                 formatter={(value, name) => [
//                   name === "Revenue" ? formatIndianPrice(value) : value,
//                   name
//                 ]}
//               />
//               <RechartsLegend />
//               <Line
//                 yAxisId="left"
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#3B82F6"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Revenue"
//               />
//               <Line
//                 yAxisId="right"
//                 type="monotone"
//                 dataKey="deals"
//                 stroke="#10B981"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Deals"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


//           {/* Top Performers */}
//           <div className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}>
//             <h2 className={`text-lg font-semibold mb-6 ${textColor}`}>Top Performers</h2>
//             <div className="space-y-4">
//               {performanceData.map((agent, index) => (
//                 <div
//                   key={agent.agent}
//                   className="flex items-center justify-between py-2"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center
//                       ${index < 3 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
//                       {index + 1}
//                     </div>
//                     <div>
//                       <p className={`font-medium ${textColor}`}>{agent.agent}</p>
//                       <p className={secondaryText}>{agent.deals} deals</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-medium ${textColor}`}>{formatIndianPrice(agent.revenue)}</p>
//                     <p className={secondaryText}>Revenue</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Analytics;


import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend as RechartsLegend, ResponsiveContainer
} from "recharts";
import {
  TrendingUp,
  Home,
  CalendarCheck,
  Percent,
  IndianRupee
} from "lucide-react";
import Navbar from "../components/common/Navbar";

// Format number to Indian currency
const formatIndianPrice = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

// Mock Data
const salesData = [
  { month: "Jan", revenue: 3750000, deals: 12 },
  { month: "Feb", revenue: 4300000, deals: 15 },
  { month: "Mar", revenue: 3950000, deals: 14 },
  { month: "Apr", revenue: 5100000, deals: 18 },
  { month: "May", revenue: 4600000, deals: 16 },
];

const performanceData = [
  { agent: "John Doe", deals: 24, revenue: 72500000 },
  { agent: "Jane Smith", deals: 22, revenue: 65000000 },
  { agent: "Mike Johnson", deals: 18, revenue: 51500000 },
  { agent: "Sarah Wilson", deals: 16, revenue: 48500000 },
  { agent: "Tom Brown", deals: 15, revenue: 45000000 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

function Analytics() {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState("month");
  const [filter, setFilter] = useState(""); // New filter state

  const handleReset = () => {
    setFilter("");
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-gray-100" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-500";

  const kpiCards = [
    {
      title: "Total Revenue",
      value: formatIndianPrice(21700000),
      change: "+12.5%",
      icon: IndianRupee,
      trend: "up",
    },
    {
      title: "Properties Sold",
      value: "75",
      change: "+8.2%",
      icon: Home,
      trend: "up",
    },
    {
      title: "Site Visits",
      value: "183",
      change: "+15.3%",
      icon: CalendarCheck,
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "20.8%",
      change: "+2.4%",
      icon: Percent,
      trend: "up",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">

        {/* Filter Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {["Lead Analysis", "Team Performance", "Property Stats"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${filter === item
                    ? "bg-blue-600 text-white"
                    : `${isDark ? "text-gray-400" : "text-gray-600"} hover:bg-gray-100 dark:hover:bg-gray-700`
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
          {filter && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* Lead Analysis */}
        {(!filter || filter === "Lead Analysis") && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiCards.map((card) => (
                <div
                  key={card.title}
                  className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={secondaryText}>{card.title}</p>
                      <p className={`text-2xl font-semibold mt-2 ${textColor}`}>
                        {card.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp
                          className={`w-4 h-4 ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}
                        />
                        <span className={`ml-1 text-sm ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {card.change}
                        </span>
                      </div>
                    </div>
                    <card.icon className={`w-8 h-8 ${secondaryText}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue & Deals Chart */}
            <div className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-lg font-semibold ${textColor}`}>Revenue & Deals</h2>
                <div className="flex space-x-2">
                  {["week", "month", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${timeRange === range
                          ? "bg-blue-600 text-white"
                          : `${isDark ? "text-gray-400" : "text-gray-600"} hover:bg-gray-100 dark:hover:bg-gray-700`
                        }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f3f4f6"} />
                  <XAxis dataKey="month" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                  <YAxis
                    yAxisId="left"
                    stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <YAxis yAxisId="right" orientation="right" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    formatter={(value, name) => [
                      name === "Revenue" ? formatIndianPrice(value) : value,
                      name
                    ]}
                  />
                  <RechartsLegend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                    name="Revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="deals"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                    name="Deals"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Team Performance */}
        {(!filter || filter === "Team Performance") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}>
              <h2 className={`text-lg font-semibold mb-6 ${textColor}`}>Top Performers</h2>
              <div className="space-y-4">
                {performanceData.map((agent, index) => (
                  <div
                    key={agent.agent}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${index < 3 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className={`font-medium ${textColor}`}>{agent.agent}</p>
                        <p className={secondaryText}>{agent.deals} deals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${textColor}`}>{formatIndianPrice(agent.revenue)}</p>
                      <p className={secondaryText}>Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Property Stats */}
        {filter === "Property Stats" && (
          <div className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Property Stats</h2>
            <p className={secondaryText}>Property statistics module coming soon...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Analytics;
