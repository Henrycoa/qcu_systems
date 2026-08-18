// src/components/pages/admin/Statistics.jsx
import React from 'react';
import { 
  FileText, CheckCircle, XCircle, Clock,
  Users, Award, LayoutDashboard, TrendingUp,
  Calendar, UserCheck, UserX, Activity
} from 'lucide-react';

const Statistics = ({ stats, usersList }) => {
  // Calculate additional stats
  const completionRate = stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0;
  const rejectionRate = stats.total > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0;
  const pendingRate = stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0;
  
  // Count users by role
  const adminCount = usersList.filter(u => u.user_type === 'admin').length;
  const staffCount = usersList.filter(u => u.user_type === 'staff').length;
  const userCount = usersList.filter(u => u.user_type === 'user').length;
  
  // Active vs Inactive users
  const activeUsers = usersList.filter(u => u.user_status === 1).length;
  const inactiveUsers = usersList.filter(u => u.user_status === 0).length;

  return (
    <div className="space-y-6">
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#243ead] to-blue-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Total Applications</p>
              <p className="text-4xl font-black mt-1">{stats.total}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-blue-200 text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>All time submissions</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-xs font-bold uppercase tracking-wider">Pending</p>
              <p className="text-4xl font-black mt-1">{stats.pending}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-yellow-200 text-xs">
            <span>{pendingRate}% of total</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider">Approved</p>
              <p className="text-4xl font-black mt-1">{stats.approved}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-emerald-200 text-xs">
            <span>{completionRate}% completion rate</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-xs font-bold uppercase tracking-wider">Rejected</p>
              <p className="text-4xl font-black mt-1">{stats.rejected}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <XCircle className="w-7 h-7" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-red-200 text-xs">
            <span>{rejectionRate}% rejection rate</span>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-[#243ead]" />
            User Statistics
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-100">
              <p className="text-2xl font-black text-purple-600">{usersList.length}</p>
              <p className="text-xs text-purple-500 font-bold uppercase">Total Users</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
              <p className="text-2xl font-black text-emerald-600">{activeUsers}</p>
              <p className="text-xs text-emerald-500 font-bold uppercase">Active</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
              <p className="text-2xl font-black text-red-600">{inactiveUsers}</p>
              <p className="text-xs text-red-500 font-bold uppercase">Inactive</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
              <p className="text-2xl font-black text-blue-600">{adminCount + staffCount}</p>
              <p className="text-xs text-blue-500 font-bold uppercase">Staff/Admin</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-gray-700">{adminCount}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Admins</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-gray-700">{staffCount}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Staff</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-gray-700">{userCount}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Additional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">Avg Processing</p>
              <p className="text-2xl font-black text-[#243ead]">3.5</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#243ead]" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Days average</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">Success Rate</p>
              <p className="text-2xl font-black text-emerald-500">{completionRate}%</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Approval rate</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">Total Users</p>
              <p className="text-2xl font-black text-purple-500">{usersList.length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Registered accounts</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <h4 className="text-sm font-bold text-gray-700 mb-4">Application Distribution</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="font-bold">Approved</span>
              <span>{stats.approved} ({completionRate}%)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="font-bold">Pending</span>
              <span>{stats.pending} ({pendingRate}%)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full transition-all duration-500" style={{ width: `${pendingRate}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="font-bold">Rejected</span>
              <span>{stats.rejected} ({rejectionRate}%)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${rejectionRate}%` }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistics;