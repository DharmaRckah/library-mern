import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "../../context/Auth.js";
const Home = () => {
  const [serverLoad, setServerLoad] = useState([
    { name: "Database", load: 70 },
    { name: "Web Server", load: 50 },
  ]);
  const [auth] = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  console.log(auth, "jhbsdfb");
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  // Format date and time
  const formatDateTime = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Function to simulate server load change
  useEffect(() => {
    const interval = setInterval(() => {
      setServerLoad([
        { name: "Database", load: Math.floor(Math.random() * 100) }, // Random load values
        { name: "Web Server", load: Math.floor(Math.random() * 100) },
      ]);
    }, 2000); // Update every 2 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const siteVisitsData = [
    { day: "4", unique: 40, pageViews: 65 },
    { day: "6", unique: 55, pageViews: 75 },
    { day: "8", unique: 70, pageViews: 80 },
    { day: "10", unique: 90, pageViews: 85 },
    { day: "12", unique: 65, pageViews: 100 },
    { day: "14", unique: 85, pageViews: 115 },
    { day: "16", unique: 110, pageViews: 90 },
  ];

  const activityData = [
    { name: "User 1", orders: 10 },
    { name: "User 2", orders: 30 },
    { name: "User 3", orders: 50 },
    { name: "User 4", orders: 80 },
    { name: "User 5", orders: 60 },
    { name: "User 6", orders: 90 },
    { name: "User 7", orders: 40 },
  ];
 useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes scrollingText {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return (
    <div className="flex flex-col  responsive-container">
      <div className="w-full   p-4  flex flex-col">
        <div className="relative overflow-hidden h-12">
          {/* Moving text element */}
          <div
            className="inline-block whitespace-nowrap text-lg md:text-3xl font-bold shadow-sm p-2 rounded  text-pink-500"
            style={{
              animation: "scrollingText 10s linear infinite",
            }}
          >
            Hello,  {auth.user.userName} Welcome To Swami Vivekananda Library
          </div>
        </div>
       
      </div>
      <div className="w-full bg-gradient-to-b from-pink-500 to-pink-200 rounded-2xl p-4 md:p-6 border-5 text-white border-white shadow-lg text-black flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="text-lg md:text-xl font-bold shadow-sm p-2 rounded">
          Hello, {auth.user.userName} Welcome To Swami Vivekananda Library
        </div>
        <div className="text-sm md:text-2xl text-green-800 mt-2 md:mt-0 shadow-lg p-2 rounded">
          {formatDateTime(currentTime)}
        </div>
      </div>

      <main className="flex-grow p-6 bg-gray-100  ">
        {/* Top Tiles */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-400 p-4 rounded text-white">
            <h2 className="text-lg font-bold">1349</h2>
            <p>Total Student</p>
          </div>
          <div className="bg-green-400 p-4 rounded text-white">
            <h2 className="text-lg font-bold">549</h2>
            <p>Total Spends Amount</p>
          </div>
          <div className="bg-purple-400 p-4 rounded text-white">
            <h2 className="text-lg font-bold">+89%</h2>
            <p>Total Recived Amount</p>
          </div>
          <div className="bg-yellow-400 p-4 rounded text-white">
            <h2 className="text-lg font-bold">12.5M$</h2>
            <p>Total Recipts</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Site Visits Chart */}
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Site Visits</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={siteVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="unique" stroke="#8884d8" />
                <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activities Chart */}
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Activities</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Server Load Section */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="col-span-2 bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Server Load</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={serverLoad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="load" fill="#ff4d4f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
