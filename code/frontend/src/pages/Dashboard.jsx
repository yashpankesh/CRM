
// "use client"
// import { useTheme } from "../context/ThemeContext"
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip as RechartsTooltip,
//   Legend as RechartsLegend,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   CartesianGrid,
//   Line,
// } from "recharts"
// import Navbar from "../components/common/Navbar"

// // Data configurations
// const revenueData = [
//   { name: "Jan", revenue: 4000, sales: 2400 },
//   { name: "Feb", revenue: 3000, sales: 1398 },
//   { name: "Mar", revenue: 9800, sales: 3908 },
//   { name: "Apr", revenue: 3908, sales: 4800 },
//   { name: "May", revenue: 6800, sales: 2900 },
//   { name: "Jun", revenue: 4500, sales: 2500 },
// ]

// const customerData = [
//   { name: "Prospecting", value: 400 },
//   { name: "Proposal", value: 300 },
//   { name: "Negotiation", value: 300 },
// ]

// const activityData = [
//   { date: "May 1", actions: 20 },
//   { date: "May 2", actions: 35 },
//   { date: "May 3", actions: 50 },
//   { date: "May 4", actions: 40 },
//   { date: "May 5", actions: 70 },
//   { date: "May 6", actions: 60 },
// ]

// // Updated professional color palette with different blue shades
// const COLORS = ["#1d4ed8", "#3b82f6", "#93c5fd"]

// const Dashboard = () => {
//   const { theme } = useTheme()
//   const isDark = theme === "dark"

//   return (
//     <main
//       className={`min-h-screen bg-gradient-to-br ${isDark ? "from-gray-900 to-gray-800" : "from-gray-50 to-blue-50"}`}
//     >
//       <Navbar /> {/* Add this line */}
//       <div className="p-0"></div>
//       <div className="p-8">
//         {/* Header */}
//         <header className="mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className={`text-2xl font-semibold mb-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//                 Welcome back, Admin
//               </h1>
//               <p className={isDark ? "text-gray-400" : "text-gray-500"}>Dashboard Overview</p>
//             </div>{" "}
//             <div className="flex items-center gap-3">
//               <button
//                 className={`px-4 py-2 text-sm ${
//                   isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
//                 } transition-all`}
//               >
//                 Export
//               </button>
//               <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
//                 Add Property
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* KPI Cards */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div
//             className={`p-6 rounded-xl shadow-sm border transition-all ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 hover:border-gray-600"
//                 : "bg-white border-blue-100 hover:border-blue-200"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className={isDark ? "text-gray-400" : "text-gray-500"}>Total Leads</p>
//                 <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>547</h3>
//                 <p className="text-xs text-green-600 mt-1">↑ 12.5%</p>
//               </div>{" "}
//               <div className={`p-3 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-50"}`}>
//                 <i className={`fas fa-user-group text-xl ${isDark ? "text-blue-400" : "text-blue-500"}`}></i>
//               </div>
//             </div>
//           </div>

//           <div
//             className={`p-6 rounded-xl shadow-sm border transition-all ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 hover:border-gray-600"
//                 : "bg-white border-blue-100 hover:border-blue-200"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className={isDark ? "text-gray-400" : "text-gray-500"}>Conversions</p>
//                 <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>92</h3>
//                 <p className="text-xs text-green-600 mt-1">↑ 5.3%</p>
//               </div>
//               <div className={`p-3 rounded-full ${isDark ? "bg-green-900" : "bg-green-50"}`}>
//                 <i className={`fas fa-arrow-up text-xl ${isDark ? "text-green-400" : "text-green-500"}`}></i>
//               </div>
//             </div>
//           </div>

//           <div
//             className={`p-6 rounded-xl shadow-sm border transition-all ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 hover:border-gray-600"
//                 : "bg-white border-blue-100 hover:border-blue-200"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className={isDark ? "text-gray-400" : "text-gray-500"}>Site Visits</p>
//                 <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>175</h3>
//                 <p className="text-xs text-red-500 mt-1">↓ 2.7%</p>
//               </div>
//               <div className={`p-3 rounded-full ${isDark ? "bg-orange-900" : "bg-orange-50"}`}>
//                 <i className={`fas fa-calendar text-xl ${isDark ? "text-orange-400" : "text-orange-500"}`}></i>
//               </div>
//             </div>
//           </div>

//           <div
//             className={`p-6 rounded-xl shadow-sm border transition-all ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 hover:border-gray-600"
//                 : "bg-white border-blue-100 hover:border-blue-200"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className={isDark ? "text-gray-400" : "text-gray-500"}>Active Properties</p>
//                 <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>26</h3>
//                 <p className="text-xs text-green-600 mt-1">↑ 3.8%</p>
//               </div>
//               <div className={`p-3 rounded-full ${isDark ? "bg-purple-900" : "bg-purple-50"}`}>
//                 <i className={`fas fa-building text-xl ${isDark ? "text-purple-400" : "text-purple-500"}`}></i>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Charts Section */}
//         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Revenue Chart */}
//           <div
//             className={`col-span-2 p-6 rounded-xl shadow-sm border ${
//               isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//             }`}
//           >
//             <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//               Revenue Overview
//             </h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={revenueData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
//                   <XAxis dataKey="name" stroke={isDark ? "#9CA3AF" : "#4B5563"} />
//                   <YAxis stroke={isDark ? "#9CA3AF" : "#4B5563"} tickFormatter={(value) => `₹${value / 1000}K`} />
//                   <RechartsTooltip
//                     contentStyle={{
//                       backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
//                       border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
//                       color: isDark ? "#F3F4F6" : "#1F2937",
//                     }}
//                   />
//                   <RechartsLegend
//                     wrapperStyle={{
//                       color: isDark ? "#F3F4F6" : "#1F2937",
//                     }}
//                   />
//                   <Bar dataKey="revenue" fill="#3B82F6" />
//                   <Bar dataKey="sales" fill="#93C5FD" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Customer Stage Chart */}
//           <div
//             className={`p-6 rounded-xl shadow-sm border ${
//               isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//             }`}
//           >
//             <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//               Customer Stages
//             </h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={customerData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, value }) => `${name}: ${value}`}
//                   >
//                     {customerData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <RechartsTooltip
//                     contentStyle={{
//                       backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
//                       border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
//                       color: isDark ? "#F3F4F6" : "#1F2937",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Activity Chart */}
//           <div
//             className={`col-span-3 p-6 rounded-xl shadow-sm border mb-6 ${
//               isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//             }`}
//           >
//             <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//               Daily Activity
//             </h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={activityData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
//                   <XAxis dataKey="date" stroke={isDark ? "#9CA3AF" : "#4B5563"} />
//                   <YAxis stroke={isDark ? "#9CA3AF" : "#4B5563"} />
//                   <RechartsTooltip
//                     contentStyle={{
//                       backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
//                       border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
//                       color: isDark ? "#F3F4F6" : "#1F2937",
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="actions"
//                     stroke="#3B82F6"
//                     strokeWidth={2}
//                     dot={{ fill: isDark ? "#60A5FA" : "#3B82F6", strokeWidth: 2 }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </section>

//         {/* Builder Performance Section */}
//         <section
//           className={`rounded-xl shadow-sm border ${
//             isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//           }`}
//         >
//           <div className="p-6">
//             <h2 className={`text-base font-semibold mb-6 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//               Builder Performance
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className={isDark ? "border-gray-700" : "border-gray-100"}>
//                     <th
//                       className={`px-6 py-3 text-left text-xs font-medium uppercase ${
//                         isDark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       Project
//                     </th>
//                     <th
//                       className={`px-6 py-3 text-left text-xs font-medium uppercase ${
//                         isDark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       Leads
//                     </th>
//                     <th
//                       className={`px-6 py-3 text-left text-xs font-medium uppercase ${
//                         isDark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       Site Visits
//                     </th>
//                     <th
//                       className={`px-6 py-3 text-left text-xs font-medium uppercase ${
//                         isDark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       Conversions
//                     </th>
//                     <th
//                       className={`px-6 py-3 text-left text-xs font-medium uppercase ${
//                         isDark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       Rate
//                     </th>
//                     <th
//                       className={`px-6 py-3 text-left text-xs font-medium uppercase ${
//                         isDark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       Performance
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className={isDark ? "divide-gray-700" : "divide-gray-100"}>
//                   {[
//                     {
//                       name: "Green Valley Homes",
//                       leads: 128,
//                       visits: 87,
//                       conversions: 43,
//                       rate: 33.6,
//                       color: "bg-blue-600",
//                     },
//                     {
//                       name: "Urban Heights Tower",
//                       leads: 95,
//                       visits: 62,
//                       conversions: 29,
//                       rate: 30.5,
//                       color: "bg-blue-500",
//                     },
//                     {
//                       name: "Lakeside Villas",
//                       leads: 76,
//                       visits: 41,
//                       conversions: 18,
//                       rate: 23.7,
//                       color: "bg-blue-400",
//                     },
//                     {
//                       name: "Sunset Apartments",
//                       leads: 112,
//                       visits: 64,
//                       conversions: 26,
//                       rate: 23.2,
//                       color: "bg-blue-400",
//                     },
//                     {
//                       name: "Metro Business Park",
//                       leads: 68,
//                       visits: 29,
//                       conversions: 12,
//                       rate: 17.6,
//                       color: "bg-blue-300",
//                     },
//                   ].map((item, idx) => (
//                     <tr key={idx} className={`${isDark ? "hover:bg-gray-700/50" : "hover:bg-blue-50"} transition-all`}>
//                       <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{item.name}</td>
//                       <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
//                         {item.leads}
//                       </td>
//                       <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
//                         {item.visits}
//                       </td>
//                       <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
//                         {item.conversions}
//                       </td>
//                       <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
//                         {item.rate}%
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className={`w-full rounded-full h-1.5 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
//                           <div
//                             className={`${item.color} h-1.5 rounded-full transition-all`}
//                             style={{ width: `${item.rate}%` }}
//                           ></div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }

// export default Dashboard




"use client"
import { useTheme } from "../context/ThemeContext"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts"
import Navbar from "../components/common/Navbar"

// Data configurations
const revenueData = [
  { name: "Jan", revenue: 4000, sales: 2400 },
  { name: "Feb", revenue: 3000, sales: 1398 },
  { name: "Mar", revenue: 9800, sales: 3908 },
  { name: "Apr", revenue: 3908, sales: 4800 },
  { name: "May", revenue: 6800, sales: 2900 },
  { name: "Jun", revenue: 4500, sales: 2500 },
]

const customerData = [
  { name: "Prospecting", value: 400 },
  { name: "Proposal", value: 300 },
  { name: "Negotiation", value: 300 },
]

const activityData = [
  { date: "May 1", actions: 20 },
  { date: "May 2", actions: 35 },
  { date: "May 3", actions: 50 },
  { date: "May 4", actions: 40 },
  { date: "May 5", actions: 70 },
  { date: "May 6", actions: 60 },
]

// Updated professional color palette with different blue shades
const COLORS = ["#1d4ed8", "#3b82f6", "#93c5fd"]

const Dashboard = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${isDark ? "from-gray-900 to-gray-800" : "from-gray-50 to-blue-50"}`}
    >
      <Navbar /> {/* Add this line */}
     
      <div className="p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-semibold mb-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                Welcome back, Admin
              </h1>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>Dashboard Overview</p>
            </div>{" "}
            <div className="flex items-center gap-3">
              <button
                className={`px-4 py-2 text-sm ${
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                } transition-all`}
              >
                Export
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                Add Property
              </button>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl shadow-sm border transition-all ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-blue-100 hover:border-blue-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>Total Leads</p>
                <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>547</h3>
                <p className="text-xs text-green-600 mt-1">↑ 12.5%</p>
              </div>{" "}
              <div className={`p-3 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-50"}`}>
                <i className={`fas fa-user-group text-xl ${isDark ? "text-blue-400" : "text-blue-500"}`}></i>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-sm border transition-all ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-blue-100 hover:border-blue-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>Conversions</p>
                <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>92</h3>
                <p className="text-xs text-green-600 mt-1">↑ 5.3%</p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? "bg-green-900" : "bg-green-50"}`}>
                <i className={`fas fa-arrow-up text-xl ${isDark ? "text-green-400" : "text-green-500"}`}></i>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-sm border transition-all ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-blue-100 hover:border-blue-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>Site Visits</p>
                <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>175</h3>
                <p className="text-xs text-red-500 mt-1">↓ 2.7%</p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? "bg-orange-900" : "bg-orange-50"}`}>
                <i className={`fas fa-calendar text-xl ${isDark ? "text-orange-400" : "text-orange-500"}`}></i>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-sm border transition-all ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-blue-100 hover:border-blue-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>Active Properties</p>
                <h3 className={`text-2xl font-semibold mt-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>26</h3>
                <p className="text-xs text-green-600 mt-1">↑ 3.8%</p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? "bg-purple-900" : "bg-purple-50"}`}>
                <i className={`fas fa-building text-xl ${isDark ? "text-purple-400" : "text-purple-500"}`}></i>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div
            className={`p-6 rounded-xl shadow-sm border ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              Revenue Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" stroke={isDark ? "#9CA3AF" : "#4B5563"} />
                  <YAxis stroke={isDark ? "#9CA3AF" : "#4B5563"} tickFormatter={(value) => `₹${value / 1000}K`} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
                      color: isDark ? "#F3F4F6" : "#1F2937",
                    }}
                  />
                  <RechartsLegend
                    wrapperStyle={{
                      color: isDark ? "#F3F4F6" : "#1F2937",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                  <Bar dataKey="sales" fill="#93C5FD" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Stage Chart */}
          <div
            className={`p-6 rounded-xl shadow-sm border ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              Customer Stages
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
                      color: isDark ? "#F3F4F6" : "#1F2937",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Chart */}
          <div
            className={`col-span-2 p-6 rounded-xl shadow-sm border mb-6 ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              Daily Activity
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="date" stroke={isDark ? "#9CA3AF" : "#4B5563"} />
                  <YAxis stroke={isDark ? "#9CA3AF" : "#4B5563"} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
                      color: isDark ? "#F3F4F6" : "#1F2937",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actions"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: isDark ? "#60A5FA" : "#3B82F6", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Builder Performance Section */}
        <section
          className={`rounded-xl shadow-sm border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="p-6">
            <h2 className={`text-base font-semibold mb-6 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              Builder Performance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? "border-gray-700" : "border-gray-100"}>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Project
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Leads
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Site Visits
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Conversions
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Rate
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className={isDark ? "divide-gray-700" : "divide-gray-100"}>
                  {[
                    {
                      name: "Green Valley Homes",
                      leads: 128,
                      visits: 87,
                      conversions: 43,
                      rate: 33.6,
                      color: "bg-blue-600",
                    },
                    {
                      name: "Urban Heights Tower",
                      leads: 95,
                      visits: 62,
                      conversions: 29,
                      rate: 30.5,
                      color: "bg-blue-500",
                    },
                    {
                      name: "Lakeside Villas",
                      leads: 76,
                      visits: 41,
                      conversions: 18,
                      rate: 23.7,
                      color: "bg-blue-400",
                    },
                    {
                      name: "Sunset Apartments",
                      leads: 112,
                      visits: 64,
                      conversions: 26,
                      rate: 23.2,
                      color: "bg-blue-400",
                    },
                    {
                      name: "Metro Business Park",
                      leads: 68,
                      visits: 29,
                      conversions: 12,
                      rate: 17.6,
                      color: "bg-blue-300",
                    },
                  ].map((item, idx) => (
                    <tr key={idx} className={`${isDark ? "hover:bg-gray-700/50" : "hover:bg-blue-50"} transition-all`}>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{item.name}</td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {item.leads}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {item.visits}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {item.conversions}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {item.rate}%
                      </td>
                      <td className="px-6 py-4">
                        <div className={`w-full rounded-full h-1.5 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                          <div
                            className={`${item.color} h-1.5 rounded-full transition-all`}
                            style={{ width: `${item.rate}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
