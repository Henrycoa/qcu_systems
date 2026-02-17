import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';
import { 
  Eye, DollarSign, Package, Users, TrendingUp, TrendingDown,
  MoreVertical, Map, Smartphone, Tablet, Monitor,
  Search, Twitter, Github, Youtube, Facebook, ChevronRight,
  ShoppingCart, Download, Filter
} from 'lucide-react';

const Dashboard = () => {
  const [paymentsTimeframe, setPaymentsTimeframe] = useState('Monthly');
  const [profitTimeframe, setProfitTimeframe] = useState('This Week');

  // Sample data
  const salesData = [
    { month: 'Jan', current: 65, previous: 45 },
    { month: 'Feb', current: 78, previous: 52 },
    { month: 'Mar', current: 90, previous: 48 },
    { month: 'Apr', current: 81, previous: 61 },
    { month: 'May', current: 56, previous: 55 },
    { month: 'Jun', current: 65, previous: 67 },
    { month: 'Jul', current: 88, previous: 60 },
    { month: 'Aug', current: 76, previous: 72 },
    { month: 'Sep', current: 94, previous: 68 },
    { month: 'Oct', current: 89, previous: 75 },
    { month: 'Nov', current: 72, previous: 70 },
    { month: 'Dec', current: 85, previous: 80 }
  ];

  const revenueData = [
    { day: 'Mon', amount: 4200 },
    { day: 'Tue', amount: 5200 },
    { day: 'Wed', amount: 3800 },
    { day: 'Thu', amount: 6100 },
    { day: 'Fri', amount: 4500 },
    { day: 'Sat', amount: 7200 },
    { day: 'Sun', amount: 5800 }
  ];

  const devicesData = [
    { name: 'Desktop', value: 65, color: '#1a56db', icon: <Monitor size={16} /> },
    { name: 'Mobile', value: 20, color: '#1e4db7', icon: <Smartphone size={16} /> },
    { name: 'Tablet', value: 10, color: '#2a3547', icon: <Tablet size={16} /> },
    { name: 'Other', value: 5, color: '#7c8fac', icon: <MoreVertical size={16} /> }
  ];

  const channels = [
    { name: 'Google', logo: <Search size={18} />, visitors: '3.5K', growth: '+12.5%', color: 'bg-blue-500' },
    { name: 'Twitter', logo: <Twitter size={18} />, visitors: '2.8K', growth: '+8.3%', color: 'bg-sky-400' },
    { name: 'GitHub', logo: <Github size={18} />, visitors: '2.1K', growth: '+5.7%', color: 'bg-gray-800' },
    { name: 'YouTube', logo: <Youtube size={18} />, visitors: '1.9K', growth: '-2.1%', color: 'bg-red-500' },
    { name: 'Facebook', logo: <Facebook size={18} />, visitors: '1.5K', growth: '+3.2%', color: 'bg-blue-600' }
  ];

  const recentActivity = [
    { user: 'Jacob Jones', action: 'placed an order', time: '2 min ago', amount: '$250.00' },
    { user: 'Emma Wilson', action: 'subscribed to premium', time: '10 min ago', amount: '$29.99' },
    { user: 'Alex Johnson', action: 'requested a refund', time: '25 min ago', amount: '$120.00' },
    { user: 'Sophia Brown', action: 'left a review', time: '1 hour ago', amount: null },
    { user: 'Michael Davis', action: 'updated profile', time: '2 hours ago', amount: null }
  ];

  const stats = [
    { 
      title: 'Total Views', 
      value: '3.5K', 
      change: '+0.43%', 
      trend: 'up',
      icon: <Eye size={24} />,
      color: 'from-blue-500 to-cyan-400'
    },
    { 
      title: 'Total Profit', 
      value: '$4.2K', 
      change: '+4.35%', 
      trend: 'up',
      icon: <DollarSign size={24} />,
      color: 'from-emerald-500 to-green-400'
    },
    { 
      title: 'Total Products', 
      value: '3.5K', 
      change: '+2.59%', 
      trend: 'up',
      icon: <Package size={24} />,
      color: 'from-violet-500 to-purple-400'
    },
    { 
      title: 'Total Users', 
      value: '3.5K', 
      change: '-0.95%', 
      trend: 'down',
      icon: <Users size={24} />,
      color: 'from-amber-500 to-orange-400'
    }
  ];

  const orders = [
    { id: '#ORD-001', customer: 'John Smith', date: 'Jan 15, 2024', amount: '$250.00', status: 'Completed' },
    { id: '#ORD-002', customer: 'Sarah Johnson', date: 'Jan 14, 2024', amount: '$150.00', status: 'Pending' },
    { id: '#ORD-003', customer: 'Mike Wilson', date: 'Jan 13, 2024', amount: '$350.00', status: 'Completed' },
    { id: '#ORD-004', customer: 'Emma Davis', date: 'Jan 12, 2024', amount: '$450.00', status: 'Processing' },
    { id: '#ORD-005', customer: 'David Brown', date: 'Jan 11, 2024', amount: '$200.00', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#2a3547] mb-1">{stat.value}</div>
              <div className="text-sm text-[#7c8fac]">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Performance */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Sales Performance</h2>
                <p className="text-sm text-[#7c8fac]">Monthly revenue comparison</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#eef2ff] rounded-lg transition-colors">
                  <Filter size={18} className="text-[#7c8fac]" />
                </button>
                <select 
                  value={paymentsTimeframe}
                  onChange={(e) => setPaymentsTimeframe(e.target.value)}
                  className="px-3 py-2 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e4db7] text-[#2a3547] bg-white"
                >
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a56db" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1a56db" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c8fac" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7c8fac" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#1a56db" 
                    strokeWidth={2}
                    fill="url(#currentGradient)"
                    name="Current Year"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="#cbd5e1" 
                    strokeWidth={1}
                    fill="url(#previousGradient)"
                    name="Previous Year"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Revenue */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Weekly Revenue</h2>
                <p className="text-sm text-[#7c8fac]">Daily income breakdown</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#eef2ff] rounded-lg transition-colors">
                  <Download size={18} className="text-[#7c8fac]" />
                </button>
                <select 
                  value={profitTimeframe}
                  onChange={(e) => setProfitTimeframe(e.target.value)}
                  className="px-3 py-2 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e4db7] text-[#2a3547] bg-white"
                >
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar 
                    dataKey="amount" 
                    fill="#1e4db7" 
                    radius={[6, 6, 6, 6]}
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Analytics & Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Traffic Sources */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Traffic Sources</h2>
                <p className="text-sm text-[#7c8fac]">Top referral channels</p>
              </div>
              <button className="text-[#7c8fac] hover:text-[#2a3547] p-1">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {channels.map((channel, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#eef2ff] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${channel.color} flex items-center justify-center text-white`}>
                      {channel.logo}
                    </div>
                    <div>
                      <div className="font-medium text-[#2a3547]">{channel.name}</div>
                      <div className="text-sm text-[#7c8fac]">{channel.visitors} visitors</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${channel.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {channel.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Analytics */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Device Analytics</h2>
                <p className="text-sm text-[#7c8fac]">Visitor device distribution</p>
              </div>
              <Map size={20} className="text-[#7c8fac]" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <ResponsiveContainer width={220} height={220}>
                  <PieChart>
                    <Pie
                      data={devicesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {devicesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-2xl font-bold text-[#2a3547]">2.5K</div>
                  <div className="text-xs text-[#7c8fac]">Total Visitors</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {devicesData.map((device, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#eef2ff] transition-colors">
                    <div className="text-[#7c8fac]">{device.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#2a3547]">{device.name}</div>
                      <div className="text-xs text-[#7c8fac]">{device.value}%</div>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Recent Orders</h2>
                <p className="text-sm text-[#7c8fac]">Latest customer orders</p>
              </div>
              <button className="flex items-center gap-1 text-sm text-[#1e4db7] font-medium hover:text-[#1a56db]">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {orders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#eef2ff] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eef2ff] flex items-center justify-center">
                      <ShoppingCart size={18} className="text-[#1e4db7]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#2a3547]">{order.id}</div>
                      <div className="text-sm text-[#7c8fac]">{order.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#2a3547]">{order.amount}</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                      order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Recent Activity</h2>
                <p className="text-sm text-[#7c8fac]">Latest user interactions</p>
              </div>
              <button className="text-[#7c8fac] hover:text-[#2a3547] p-1">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#eef2ff] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e4db7] flex items-center justify-center text-white font-semibold text-sm">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-[#2a3547]">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </div>
                      <div className="text-sm text-[#7c8fac]">{activity.time}</div>
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="font-semibold text-[#2a3547]">{activity.amount}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#2a3547]">Performance Summary</h2>
                <p className="text-sm text-[#7c8fac]">Key metrics overview</p>
              </div>
              <button className="p-2 hover:bg-[#eef2ff] rounded-lg transition-colors">
                <Download size={18} className="text-[#7c8fac]" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#eef2ff] rounded-lg">
                <div className="text-[#2a3547] font-medium">Conversion Rate</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-[#2a3547]">3.24%</div>
                  <div className="text-sm text-emerald-600 font-medium flex items-center">
                    <TrendingUp size={14} /> +0.5%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-[#2a3547] font-medium">Avg. Session Duration</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-[#2a3547]">4m 32s</div>
                  <div className="text-sm text-emerald-600 font-medium flex items-center">
                    <TrendingUp size={14} /> +12s
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-[#2a3547] font-medium">Bounce Rate</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-[#2a3547]">28.5%</div>
                  <div className="text-sm text-red-600 font-medium flex items-center">
                    <TrendingDown size={14} /> -2.3%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-[#2a3547] font-medium">New Customers</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-[#2a3547]">342</div>
                  <div className="text-sm text-emerald-600 font-medium flex items-center">
                    <TrendingUp size={14} /> +8.7%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;