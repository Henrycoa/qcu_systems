// src/components/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, FileText, CheckCircle, XCircle, 
  Clock, RefreshCw, Eye,
  ListChecks, LayoutDashboard,
  Shield, HeartPulse, Briefcase, Home,
  Building2, Calendar, User, Search,
  Image, File, Download, ExternalLink, AlertCircle,
  Users, Menu, X, ChevronLeft, ChevronRight,
  Award, Bell, Settings, HelpCircle, Activity,
  TrendingUp, Users2, ClipboardCheck
} from 'lucide-react';

// ✅ Import separated components
import UserAccounts from './UserAccounts';
import Statistics from './Statistics';

const AdminDashboard = ({ user: propUser, onLogout: propOnLogout }) => {
  const navigate = useNavigate();
  
  // ✅ Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  const [isMobile, setIsMobile] = useState(false);
  
  const [user, setUser] = useState(propUser || null);
  const [applications, setApplications] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // ✅ Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Check if user is logged in and is admin
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      if (parsedUser.user_type !== 'admin' && parsedUser.user_type !== 'staff') {
        navigate('/dashboard');
      }
    } catch (e) {
      console.error('Error parsing user:', e);
      navigate('/');
    }
  }, [navigate]);

  // ✅ Fetch applications
  const fetchApplications = async (status = '') => {
    setLoading(true);
    setError('');
    
    try {
      const url = `http://localhost/in%20jsesus%20name/backend/auth-file/get-applications.php${status ? `?status=${status}` : ''}`;
      
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 1) {
        const data = result.data || [];
        setApplications(data);
        setStats({
          total: data.length,
          pending: data.filter(a => a.status === 'pending').length,
          approved: data.filter(a => a.status === 'approved').length,
          rejected: data.filter(a => a.status === 'rejected').length
        });
      } else {
        setError(result.message || 'Failed to fetch applications');
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setError('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch users (for statistics)
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/users_list.php', {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status === 1) {
        setUsersList(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchUsers();
  }, []);

  // ✅ Update status
  const updateStatus = async (appId, newStatus) => {
    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/update-application-status.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: appId,
          status: newStatus,
          admin_remarks: remarks
        })
      });
      
      const result = await response.json();
      
      if (result.status === 1) {
        alert(`✅ Application ${newStatus} successfully!`);
        setShowModal(false);
        setRemarks('');
        fetchApplications(statusFilter);
      } else {
        alert('❌ Error: ' + result.message);
      }
    } catch (error) {
      console.error('❌ Update error:', error);
      alert('❌ Network error: ' + error.message);
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    fetch('http://localhost/in%20jsesus%20name/backend/auth-file/logout.php', {
      method: 'POST',
      credentials: 'include'
    }).catch(() => {});
    
    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
    
    if (propOnLogout) {
      propOnLogout();
    }
    
    navigate('/');
  };

  // ✅ Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ✅ Get status badge
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />
    };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100'}`}>
        {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // ✅ Get service label
  const getServiceLabel = (type) => {
    const labels = {
      'health-permit': 'QC Health Permit',
      'barangay-clearance': 'Barangay Clearance',
      'indigency-cert': 'Certificate of Indigency',
      'business-permit': 'Business Permit',
      'residency-cert': 'Certificate of Residency',
      'appointment': 'Book Appointment',
      'tracking': 'Track Request',
      'support': 'Request Assistance'
    };
    return labels[type] || type;
  };

  // ✅ Get service icon
  const getServiceIcon = (type) => {
    const icons = {
      'health-permit': <Shield className="w-4 h-4" />,
      'barangay-clearance': <Building2 className="w-4 h-4" />,
      'indigency-cert': <HeartPulse className="w-4 h-4" />,
      'business-permit': <Briefcase className="w-4 h-4" />,
      'residency-cert': <Home className="w-4 h-4" />,
      'appointment': <Calendar className="w-4 h-4" />
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  // ✅ Get uploaded files from application
  const getUploadedFiles = (app) => {
    if (!app) return [];
    
    let files = [];
    try {
      if (app.requirements_file) {
        const parsed = typeof app.requirements_file === 'string' 
          ? JSON.parse(app.requirements_file) 
          : app.requirements_file;
        
        if (typeof parsed === 'object') {
          Object.keys(parsed).forEach(key => {
            files.push({
              label: key.replace(/_/g, ' ').toUpperCase(),
              path: parsed[key],
              type: parsed[key]?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'document'
            });
          });
        }
      }
      
      if (app.form_data) {
        const formData = typeof app.form_data === 'string' 
          ? JSON.parse(app.form_data) 
          : app.form_data;
        
        if (formData && formData.uploaded_files) {
          Object.keys(formData.uploaded_files).forEach(key => {
            const path = formData.uploaded_files[key];
            if (!files.find(f => f.path === path)) {
              files.push({
                label: key.replace(/_/g, ' ').toUpperCase(),
                path: path,
                type: path?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'document'
              });
            }
          });
        }
      }
    } catch (e) {
      console.error('Error parsing files:', e);
    }
    
    return files;
  };

  // ✅ Get file URL
  const getFileUrl = (path) => {
    if (!path) return '#';
    if (path.startsWith('../')) {
      return path.replace('../', 'http://localhost/in%20jsesus%20name/backend/');
    }
    return `http://localhost/in%20jsesus%20name/backend/${path}`;
  };

  // ✅ Filter and sort applications
  const filteredApplications = applications.filter(app => {
    const search = searchTerm.toLowerCase();
    return (
      app.reference_no?.toLowerCase().includes(search) ||
      app.user_fname?.toLowerCase().includes(search) ||
      app.user_lname?.toLowerCase().includes(search) ||
      app.user_email?.toLowerCase().includes(search) ||
      app.service_type?.toLowerCase().includes(search)
    );
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortBy === 'pending-first') {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0;
    }
    return 0;
  });

  // ✅ Loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ Sidebar navigation items (for desktop)
  const navItems = [
    { id: 'applications', label: 'Applications', icon: <FileText className="w-5 h-5" />, count: applications.length },
    { id: 'users', label: 'User Accounts', icon: <Users className="w-5 h-5" />, count: usersList.length },
    { id: 'stats', label: 'Statistics', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  // ✅ Mobile bottom nav items
  const bottomNavItems = [
    { id: 'applications', label: 'Applications', icon: <FileText className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'stats', label: 'Stats', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  // ============================================================
  // ========== MOBILE VIEW (with bottom nav & cards) ============
  // ============================================================
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] font-sans pb-20">
        
        {/* ✅ MOBILE HEADER - QC Health Brand */}
        <header className="sticky top-0 z-30 bg-[#243ead] text-white shadow-lg">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-black uppercase tracking-tight flex items-center gap-1">
                  <Shield className="w-5 h-5 text-blue-300" />
                  QC<span className="text-blue-300">Health</span>
                </h1>
                <p className="text-[10px] text-blue-200 font-medium">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-xl transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* ✅ MOBILE MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          
          {/* ===== DASHBOARD TAB - MOBILE ===== */}
          {activeTab === 'dashboard' && (
            <>
              <div className="bg-gradient-to-br from-[#243ead] to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Welcome back,</p>
                    <h2 className="text-2xl font-black">{user?.first_name} {user?.last_name}</h2>
                    <p className="text-blue-200 text-sm mt-1">Here's what's happening</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <Activity className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase">Total</p>
                      <p className="text-2xl font-black text-[#243ead]">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 bg-[#243ead]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#243ead]" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase">Pending</p>
                      <p className="text-2xl font-black text-yellow-500">{stats.pending}</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase">Approved</p>
                      <p className="text-2xl font-black text-emerald-500">{stats.approved}</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase">Users</p>
                      <p className="text-2xl font-black text-purple-500">{usersList.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Recent Applications</h3>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="text-xs text-[#243ead] font-bold"
                  >
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{app.user_fname} {app.user_lname}</p>
                          <p className="text-xs text-gray-500">{getServiceLabel(app.service_type)}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No applications yet</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ===== APPLICATIONS TAB - MOBILE (Cards View) ===== */}
          {activeTab === 'applications' && (
            <>
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 mb-4">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-white rounded-xl p-2 text-center shadow-sm border border-gray-100">
                  <p className="text-lg font-black text-[#243ead]">{stats.total}</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">Total</p>
                </div>
                <div className="bg-white rounded-xl p-2 text-center shadow-sm border border-gray-100">
                  <p className="text-lg font-black text-yellow-500">{stats.pending}</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">Pending</p>
                </div>
                <div className="bg-white rounded-xl p-2 text-center shadow-sm border border-gray-100">
                  <p className="text-lg font-black text-emerald-500">{stats.approved}</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">Approved</p>
                </div>
                <div className="bg-white rounded-xl p-2 text-center shadow-sm border border-gray-100">
                  <p className="text-lg font-black text-red-500">{stats.rejected}</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">Rejected</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <div className="flex-1 min-w-[150px] relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border-2 rounded-xl text-sm outline-none focus:border-[#243ead]"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      fetchApplications(e.target.value);
                    }}
                    className="px-3 py-2 bg-gray-50 border-2 rounded-xl text-xs font-medium outline-none focus:border-[#243ead]"
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => fetchApplications(statusFilter)}
                    className="px-3 py-2 bg-[#243ead] text-white rounded-xl text-xs font-bold hover:bg-[#1a2f8a] transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin w-8 h-8 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400 font-medium">Loading...</p>
                </div>
              ) : sortedApplications.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-400 font-bold text-lg">No applications found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedApplications.map((app) => {
                    const files = getUploadedFiles(app);
                    return (
                      <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs font-bold text-[#243ead]">{app.reference_no}</p>
                            <p className="text-sm font-semibold text-gray-900">{app.user_fname} {app.user_lname}</p>
                            <p className="text-xs text-gray-500">{app.user_email}</p>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            {getServiceIcon(app.service_type)}
                            {getServiceLabel(app.service_type)}
                          </span>
                          <span>•</span>
                          <span>{app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}</span>
                          {files.length > 0 && (
                            <>
                              <span>•</span>
                              <button
                                onClick={() => {
                                  setSelectedFiles(files);
                                  setShowFilesModal(true);
                                }}
                                className="text-blue-600 font-bold flex items-center gap-1"
                              >
                                <Image className="w-3 h-3" />
                                {files.length}
                              </button>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowModal(true);
                          }}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                            app.status === 'pending' 
                              ? 'bg-[#243ead] text-white hover:bg-[#1a2f8a]' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {app.status === 'pending' ? 'Review' : 'View'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ===== USERS TAB - MOBILE ===== */}
          {activeTab === 'users' && (
            <UserAccounts user={user} />
          )}

          {/* ===== STATS TAB - MOBILE ===== */}
          {activeTab === 'stats' && (
            <Statistics stats={stats} usersList={usersList} />
          )}

        </div>

        {/* ✅ MOBILE BOTTOM NAVIGATION */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30 shadow-lg">
          <div className="flex items-center justify-around py-2">
            {bottomNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-all relative ${
                  activeTab === item.id ? 'text-[#243ead]' : 'text-gray-400'
                }`}
              >
                {React.cloneElement(item.icon, { 
                  className: `w-6 h-6 ${activeTab === item.id ? 'text-[#243ead]' : 'text-gray-400'}` 
                })}
                <span className={`text-[10px] font-bold ${activeTab === item.id ? 'text-[#243ead]' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {item.id === 'applications' && stats.pending > 0 && (
                  <span className="absolute -top-1 right-0 w-4 h-4 text-[9px] font-bold rounded-full flex items-center justify-center bg-red-500 text-white">
                    {stats.pending}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ===== MOBILE MODALS ===== */}
        {/* FILES MODAL - MOBILE */}
        {showFilesModal && selectedFiles.length > 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-gray-900">Uploaded Documents</h3>
                  <p className="text-sm text-gray-500">{selectedFiles.length} file(s)</p>
                </div>
                <button
                  onClick={() => setShowFilesModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        {file.type === 'image' ? (
                          <Image className="w-4 h-4 text-[#243ead]" />
                        ) : (
                          <File className="w-4 h-4 text-[#243ead]" />
                        )}
                        <span className="text-xs font-bold text-gray-700 truncate">{file.label}</span>
                      </div>
                      
                      {file.type === 'image' ? (
                        <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200">
                          <img 
                            src={getFileUrl(file.path)} 
                            alt={file.label}
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14">Image not found</text></svg>';
                            }}
                          />
                          <a 
                            href={getFileUrl(file.path)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-lg hover:bg-black/70 transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ) : (
                        <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
                          <File className="w-8 h-8 mx-auto text-gray-400 mb-1" />
                          <a 
                            href={getFileUrl(file.path)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#243ead] text-white rounded-lg text-xs font-bold hover:bg-[#1a2f8a] transition-all"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => setShowFilesModal(false)}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW APPLICATION MODAL - MOBILE */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-gray-900">Review</h3>
                  <p className="text-sm text-gray-500 font-mono">{selectedApp.reference_no}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase">Applicant</p>
                    <p className="font-bold text-gray-900 text-sm">{selectedApp.user_fname || 'N/A'} {selectedApp.user_lname || ''}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase">Email</p>
                    <p className="text-sm text-gray-700">{selectedApp.user_email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase">Service</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      {getServiceIcon(selectedApp.service_type)}
                      {getServiceLabel(selectedApp.service_type)}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase">Status</p>
                    {getStatusBadge(selectedApp.status)}
                  </div>
                </div>

                {(() => {
                  const files = getUploadedFiles(selectedApp);
                  if (files.length > 0) {
                    return (
                      <div className="p-4 bg-gray-50 rounded-2xl">
                        <p className="text-[10px] text-gray-400 font-black uppercase mb-2">Documents</p>
                        <div className="flex flex-wrap gap-2">
                          {files.map((file, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSelectedFiles(files);
                                setShowFilesModal(true);
                                setShowModal(false);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all"
                            >
                              {file.type === 'image' ? <Image className="w-3 h-3" /> : <File className="w-3 h-3" />}
                              {file.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-2">Form Data</p>
                  <div className="bg-white rounded-xl p-3 border border-gray-100 max-h-40 overflow-y-auto">
                    <pre className="text-xs whitespace-pre-wrap text-gray-700 font-mono">
                      {(() => {
                        try {
                          return JSON.stringify(JSON.parse(selectedApp.form_data || '{}'), null, 2);
                        } catch (e) {
                          return selectedApp.form_data || '{}';
                        }
                      })()}
                    </pre>
                  </div>
                </div>

                {selectedApp.admin_remarks && (
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] text-blue-600 font-black uppercase mb-1">Remarks</p>
                    <p className="text-sm text-gray-700">{selectedApp.admin_remarks}</p>
                  </div>
                )}

                {selectedApp.status === 'pending' && (
                  <>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-500 block mb-1">Remarks</label>
                      <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows="2"
                        placeholder="Add remarks..."
                        className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all resize-none text-sm"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(selectedApp.id, 'approved')}
                        className="flex-1 px-6 py-3 bg-emerald-600 text-white font-black uppercase text-xs rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(selectedApp.id, 'rejected')}
                        className="flex-1 px-6 py-3 bg-red-600 text-white font-black uppercase text-xs rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ============================================================
  // ========== DESKTOP VIEW (with sidebar & table) ==============
  // ============================================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      
      {/* ✅ DESKTOP SIDEBAR - Dark Blue */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1a237e] text-white transition-all duration-300 flex flex-col fixed h-full z-40 shadow-2xl`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
            <Shield className="w-8 h-8 text-blue-300 flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-lg font-black uppercase tracking-tighter">
                QC<span className="text-blue-300">Health</span>
              </span>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 hover:bg-white/10 rounded-lg transition-all hidden md:block"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar User Info */}
        <div className={`p-4 border-b border-white/10 ${!sidebarOpen && 'text-center'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-blue-300 truncate">{user?.user_type}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'users' || item.id === 'stats') fetchUsers();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-500/20 text-white shadow-lg' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              } ${!sidebarOpen && 'justify-center'}`}
            >
              {item.icon}
              {sidebarOpen && (
                <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
              )}
              {sidebarOpen && item.count !== undefined && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{item.count}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-white/70 hover:text-white transition-all ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* ✅ DESKTOP MAIN CONTENT */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* DESKTOP TOP BAR */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black text-[#243ead]">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <span className="text-sm font-medium text-gray-700">{user?.first_name} {user?.last_name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#243ead] text-white rounded-xl text-xs font-bold hover:bg-[#1a2f8a] transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* DESKTOP HEADER - Blue */}
        <div className="bg-[#243ead] pt-6 pb-16">
          <div className="px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white leading-none tracking-tighter uppercase italic">
                  {activeTab === 'applications' && 'Applications'}
                  {activeTab === 'users' && 'User Accounts'}
                  {activeTab === 'stats' && 'Statistics'}
                </h1>
                <p className="text-blue-100/70 text-sm font-medium italic mt-1">
                  {activeTab === 'applications' && 'Manage all service applications'}
                  {activeTab === 'users' && 'Manage user accounts'}
                  {activeTab === 'stats' && 'View system statistics'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP MAIN CONTENT AREA */}
        <div className="px-6 -mt-8">
          
          {/* ===== APPLICATIONS TAB - DESKTOP ===== */}
          {activeTab === 'applications' && (
            <>
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 mb-4">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total</p>
                      <p className="text-3xl font-black text-[#243ead]">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#243ead]/10 rounded-xl flex items-center justify-center">
                      <LayoutDashboard className="w-6 h-6 text-[#243ead]" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Pending</p>
                      <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Approved</p>
                      <p className="text-3xl font-black text-emerald-600">{stats.approved}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Rejected</p>
                      <p className="text-3xl font-black text-red-600">{stats.rejected}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8">
                  
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-[#243ead]" />
                      All Applications
                    </h2>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search..."
                          className="pl-9 pr-4 py-2 bg-gray-50 border-2 rounded-xl text-sm outline-none focus:border-[#243ead] w-40 md:w-48"
                        />
                      </div>
                      
                      <select
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          fetchApplications(e.target.value);
                        }}
                        className="px-4 py-2 bg-gray-50 border-2 rounded-xl text-sm font-medium outline-none focus:border-[#243ead]"
                      >
                        <option value="">All Status</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="approved">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                      </select>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border-2 rounded-xl text-sm font-medium outline-none focus:border-[#243ead]"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="pending-first">Pending First</option>
                      </select>
                      
                      <button
                        onClick={() => fetchApplications(statusFilter)}
                        className="px-4 py-2 bg-[#243ead] text-white rounded-xl text-sm font-bold hover:bg-[#1a2f8a] transition-all flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" /> Refresh
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-16">
                      <div className="animate-spin w-8 h-8 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-400 font-medium">Loading applications...</p>
                    </div>
                  ) : sortedApplications.length === 0 ? (
                    <div className="text-center py-16">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-400 font-bold text-lg">No applications found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b-2 border-gray-100">
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Ref #</th>
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Applicant</th>
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden md:table-cell">Service</th>
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Files</th>
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Status</th>
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden lg:table-cell">Date</th>
                            <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedApplications.map((app) => {
                            const files = getUploadedFiles(app);
                            return (
                              <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                <td className="px-4 py-4">
                                  <span className="text-sm font-bold text-[#243ead]">{app.reference_no}</span>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="font-semibold text-gray-900">{app.user_fname || 'N/A'} {app.user_lname || ''}</div>
                                  <div className="text-xs text-gray-400 truncate max-w-[120px]">{app.user_email || 'No email'}</div>
                                </td>
                                <td className="px-4 py-4 hidden md:table-cell">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    {getServiceIcon(app.service_type)}
                                    {getServiceLabel(app.service_type)}
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  {files.length > 0 ? (
                                    <button
                                      onClick={() => {
                                        setSelectedFiles(files);
                                        setShowFilesModal(true);
                                      }}
                                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all"
                                    >
                                      <Image className="w-3 h-3" />
                                      {files.length} file{files.length > 1 ? 's' : ''}
                                    </button>
                                  ) : (
                                    <span className="text-xs text-gray-400">No files</span>
                                  )}
                                </td>
                                <td className="px-4 py-4">{getStatusBadge(app.status)}</td>
                                <td className="px-4 py-4 hidden lg:table-cell">
                                  <div className="text-sm text-gray-500">
                                    {app.created_at ? new Date(app.created_at).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    }) : 'N/A'}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {app.created_at ? new Date(app.created_at).toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    }) : ''}
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                  <button
                                    onClick={() => {
                                      setSelectedApp(app);
                                      setShowModal(true);
                                    }}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 mx-auto ${
                                      app.status === 'pending' 
                                        ? 'bg-[#243ead] text-white hover:bg-[#1a2f8a]' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                  >
                                    <Eye className="w-3 h-3" />
                                    {app.status === 'pending' ? 'Review' : 'View'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {!loading && sortedApplications.length > 0 && (
                    <div className="mt-4 text-xs text-gray-400 text-center border-t border-gray-100 pt-4">
                      Showing {sortedApplications.length} of {applications.length} applications
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ===== USERS TAB - DESKTOP ===== */}
          {activeTab === 'users' && (
            <UserAccounts user={user} />
          )}

          {/* ===== STATS TAB - DESKTOP ===== */}
          {activeTab === 'stats' && (
            <Statistics stats={stats} usersList={usersList} />
          )}

        </div>
      </div>

      {/* ===== DESKTOP MODALS ===== */}
      {/* FILES MODAL - DESKTOP */}
      {showFilesModal && selectedFiles.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-4 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-gray-900">Uploaded Documents</h3>
                <p className="text-sm text-gray-500">{selectedFiles.length} file(s) uploaded</p>
              </div>
              <button
                onClick={() => setShowFilesModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      {file.type === 'image' ? (
                        <Image className="w-5 h-5 text-[#243ead]" />
                      ) : (
                        <File className="w-5 h-5 text-[#243ead]" />
                      )}
                      <span className="text-sm font-bold text-gray-700 truncate">{file.label}</span>
                    </div>
                    
                    {file.type === 'image' ? (
                      <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200">
                        <img 
                          src={getFileUrl(file.path)} 
                          alt={file.label}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14">Image not found</text></svg>';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                          <a 
                            href={getFileUrl(file.path)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white text-xs font-bold flex items-center gap-1 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Full Image
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                        <File className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500 truncate">{file.path?.split('/').pop() || 'Unknown file'}</p>
                        <a 
                          href={getFileUrl(file.path)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 px-4 py-2 bg-[#243ead] text-white rounded-lg text-xs font-bold hover:bg-[#1a2f8a] transition-all"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white px-8 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowFilesModal(false)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW APPLICATION MODAL - DESKTOP */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-4 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-gray-900">Review Application</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedApp.reference_no}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Applicant Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Applicant</p>
                  <p className="font-bold text-gray-900">{selectedApp.user_fname || 'N/A'} {selectedApp.user_lname || ''}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Email</p>
                  <p className="text-sm text-gray-700">{selectedApp.user_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Service</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {getServiceIcon(selectedApp.service_type)}
                    {getServiceLabel(selectedApp.service_type)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Status</p>
                  {getStatusBadge(selectedApp.status)}
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Submitted</p>
                  <p className="text-sm text-gray-700">
                    {selectedApp.created_at ? new Date(selectedApp.created_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    }) : 'N/A'}
                  </p>
                </div>
                {selectedApp.user_number && (
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Contact</p>
                    <p className="text-sm text-gray-700">{selectedApp.user_number}</p>
                  </div>
                )}
              </div>

              {/* Uploaded Files */}
              {(() => {
                const files = getUploadedFiles(selectedApp);
                if (files.length > 0) {
                  return (
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-3">Uploaded Documents</p>
                      <div className="flex flex-wrap gap-2">
                        {files.map((file, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedFiles(files);
                              setShowFilesModal(true);
                              setShowModal(false);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all"
                          >
                            {file.type === 'image' ? <Image className="w-3 h-3" /> : <File className="w-3 h-3" />}
                            {file.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Form Data */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-3">Form Data</p>
                <div className="bg-white rounded-xl p-4 border border-gray-100 max-h-60 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap text-gray-700 font-mono">
                    {(() => {
                      try {
                        return JSON.stringify(JSON.parse(selectedApp.form_data || '{}'), null, 2);
                      } catch (e) {
                        return selectedApp.form_data || '{}';
                      }
                    })()}
                  </pre>
                </div>
              </div>

              {/* Admin Remarks */}
              {selectedApp.admin_remarks && (
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-wider mb-1">Admin Remarks</p>
                  <p className="text-gray-700">{selectedApp.admin_remarks}</p>
                </div>
              )}

              {/* Actions - Only for pending applications */}
              {selectedApp.status === 'pending' && (
                <>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-500 block mb-2 tracking-wider">
                      Admin Remarks (optional)
                    </label>
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows="3"
                      placeholder="Add remarks or reason for approval/rejection..."
                      className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all resize-none text-gray-700"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                      className="flex-1 px-6 py-3.5 bg-emerald-600 text-white font-black uppercase text-xs rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'rejected')}
                      className="flex-1 px-6 py-3.5 bg-red-600 text-white font-black uppercase text-xs rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-8 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;