// src/components/pages/admin/UserAccounts.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Edit, Trash2, XCircle,
  CheckCircle, AlertCircle, Search, RefreshCw,
  User, Mail, Shield, Filter, Lock
} from 'lucide-react';

const UserAccounts = ({ user: propUser }) => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    user_fname: '',
    user_lname: '',
    user_email: '',
    user_name: '',
    user_type: 'user',
    user_status: 1,
    gender: 'male'
  });
  const [userFormError, setUserFormError] = useState('');
  
  // ✅ Confirm Dialog state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  // ✅ Protected accounts - hindi pwedeng ma-edit, deactivate, o delete
  const protectedAccounts = [
    'henrybuena052@gmail.com',  // Web Developer account
    // Pwede kang magdagdag ng iba pang protected emails dito
  ];

  // ✅ Check if user is protected
  const isProtectedUser = (email) => {
    return protectedAccounts.includes(email);
  };

  // ✅ Fetch users
  const fetchUsers = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Create/Update user
  const handleSaveUser = async () => {
    setUserFormError('');
    
    if (!userFormData.user_fname || !userFormData.user_lname || !userFormData.user_email || !userFormData.user_name) {
      setUserFormError('Please fill in all required fields');
      return;
    }

    try {
      const url = editingUser 
        ? 'http://localhost/in%20jsesus%20name/backend/auth-file/update_user.php'
        : 'http://localhost/in%20jsesus%20name/backend/auth-file/register.php';
      
      const payload = editingUser 
        ? { ...userFormData, user_id: editingUser.user_id }
        : { ...userFormData, user_password: 'default123' };
      
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.status === 1) {
        alert(editingUser ? '✅ User updated successfully!' : '✅ User created successfully!');
        setShowUserModal(false);
        fetchUsers();
      } else {
        setUserFormError(result.message || 'Failed to save user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setUserFormError('Network error: ' + error.message);
    }
  };

  // ✅ Toggle user status
  const toggleUserStatus = async (userId, currentStatus, userEmail) => {
    // ✅ Check if protected
    if (isProtectedUser(userEmail)) {
      alert('❌ This account is protected and cannot be deactivated.');
      return;
    }

    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/update_user_type.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          user_status: currentStatus === 1 ? 0 : 1
        })
      });
      
      const result = await response.json();
      if (result.status === 1) {
        alert('✅ User status updated!');
        fetchUsers();
      } else {
        alert('❌ Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('❌ Network error');
    }
  };

  // ✅ Delete user
  const deleteUser = (userId, userEmail) => {
    // ✅ Check if protected
    if (isProtectedUser(userEmail)) {
      alert('❌ This account is protected and cannot be deleted.');
      return;
    }

    setConfirmMessage('Are you sure you want to delete this user? This action cannot be undone.');
    setConfirmAction(() => async () => {
      try {
        const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/delete-user.php', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        });
        
        const result = await response.json();
        if (result.status === 1) {
          alert('✅ User deleted successfully!');
          fetchUsers();
        } else {
          alert('❌ Error: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('❌ Network error');
      }
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  // ✅ Get user status badge
  const getUserStatusBadge = (status) => {
    return status === 1 ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border bg-emerald-100 text-emerald-700 border-emerald-200">
        <CheckCircle className="w-3 h-3" /> Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border bg-red-100 text-red-700 border-red-200">
        <XCircle className="w-3 h-3" /> Inactive
      </span>
    );
  };

  // ✅ Filter users
  const filteredUsers = usersList.filter(u => {
    const search = searchTerm.toLowerCase();
    return (
      u.user_fname?.toLowerCase().includes(search) ||
      u.user_lname?.toLowerCase().includes(search) ||
      u.user_email?.toLowerCase().includes(search) ||
      u.user_name?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8">
        
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#243ead]" />
            All Users
            <span className="text-sm font-normal text-gray-400">({usersList.length})</span>
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="pl-9 pr-4 py-2 bg-gray-50 border-2 rounded-xl text-sm outline-none focus:border-[#243ead] w-40 md:w-48"
              />
            </div>
            <button
              onClick={() => {
                setEditingUser(null);
                setUserFormData({
                  user_fname: '',
                  user_lname: '',
                  user_email: '',
                  user_name: '',
                  user_type: 'user',
                  user_status: 1,
                  gender: 'male'
                });
                setUserFormError('');
                setShowUserModal(true);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400 font-medium">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-400 font-bold text-lg">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">ID</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Name</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden md:table-cell">Username</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden lg:table-cell">Email</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Role</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden md:table-cell">Status</th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isProtected = isProtectedUser(u.user_email);
                  
                  return (
                    <tr key={u.user_id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${isProtected ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-4 py-4 text-sm text-gray-500">{u.user_id}</td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {u.user_fname} {u.user_lname}
                          {isProtected && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                              <Lock className="w-3 h-3" />
                              Protected
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 md:hidden">{u.user_email}</div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell text-sm text-gray-600">{u.user_name}</td>
                      <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-600 truncate max-w-[150px]">{u.user_email}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          u.user_type === 'admin' ? 'bg-purple-100 text-purple-700' :
                          u.user_type === 'staff' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {u.user_type}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">{getUserStatusBadge(u.user_status)}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* ✅ Edit Button - Disabled for protected */}
                          <button
                            onClick={() => {
                              if (isProtected) {
                                alert('❌ This account is protected and cannot be edited.');
                                return;
                              }
                              setEditingUser(u);
                              setUserFormData({
                                user_fname: u.user_fname || '',
                                user_lname: u.user_lname || '',
                                user_email: u.user_email || '',
                                user_name: u.user_name || '',
                                user_type: u.user_type || 'user',
                                user_status: u.user_status || 1,
                                gender: u.gender || 'male'
                              });
                              setUserFormError('');
                              setShowUserModal(true);
                            }}
                            className={`p-2 rounded-lg transition-all ${
                              isProtected 
                                ? 'text-gray-400 cursor-not-allowed opacity-50' 
                                : 'text-blue-600 hover:bg-blue-50'
                            }`}
                            title={isProtected ? 'Protected account - cannot edit' : 'Edit User'}
                            disabled={isProtected}
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* ✅ Deactivate/Activate Button - Disabled for protected */}
                          <button
                            onClick={() => {
                              if (isProtected) {
                                alert('❌ This account is protected and cannot be deactivated.');
                                return;
                              }
                              toggleUserStatus(u.user_id, u.user_status, u.user_email);
                            }}
                            className={`p-2 rounded-lg transition-all ${
                              isProtected 
                                ? 'text-gray-400 cursor-not-allowed opacity-50' 
                                : u.user_status === 1 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={isProtected ? 'Protected account - cannot change status' : (u.user_status === 1 ? 'Deactivate' : 'Activate')}
                            disabled={isProtected}
                          >
                            {u.user_status === 1 ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>

                          {/* ✅ Delete Button - Disabled for protected */}
                          <button
                            onClick={() => {
                              if (isProtected) {
                                alert('❌ This account is protected and cannot be deleted.');
                                return;
                              }
                              deleteUser(u.user_id, u.user_email);
                            }}
                            className={`p-2 rounded-lg transition-all ${
                              isProtected 
                                ? 'text-gray-400 cursor-not-allowed opacity-50' 
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={isProtected ? 'Protected account - cannot delete' : 'Delete User'}
                            disabled={isProtected}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Protected Account Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-700">Protected Accounts</p>
            <p className="text-xs text-blue-600">
              The following accounts are protected and cannot be edited, deactivated, or deleted:
              <span className="font-bold"> {protectedAccounts.join(', ')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Confirm Action</h3>
              </div>
              <p className="text-gray-600 mb-6">{confirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USER MODAL */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <p className="text-sm text-gray-500">
                  {editingUser ? 'Update user account details' : 'Create a new user account'}
                </p>
              </div>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {userFormError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {userFormError}
                </div>
              )}

              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">First Name *</label>
                <input
                  type="text"
                  value={userFormData.user_fname}
                  onChange={(e) => setUserFormData({...userFormData, user_fname: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">Last Name *</label>
                <input
                  type="text"
                  value={userFormData.user_lname}
                  onChange={(e) => setUserFormData({...userFormData, user_lname: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">Email *</label>
                <input
                  type="email"
                  value={userFormData.user_email}
                  onChange={(e) => setUserFormData({...userFormData, user_email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">Username *</label>
                <input
                  type="text"
                  value={userFormData.user_name}
                  onChange={(e) => setUserFormData({...userFormData, user_name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">Role</label>
                <select
                  value={userFormData.user_type}
                  onChange={(e) => setUserFormData({...userFormData, user_type: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">Gender</label>
                <select
                  value={userFormData.gender}
                  onChange={(e) => setUserFormData({...userFormData, gender: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">Status</label>
                <select
                  value={userFormData.user_status}
                  onChange={(e) => setUserFormData({...userFormData, user_status: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <button
                onClick={handleSaveUser}
                className="w-full py-3 bg-[#243ead] text-white font-black uppercase text-sm rounded-xl hover:bg-[#1a2f8a] transition-all shadow-lg shadow-blue-100"
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccounts;