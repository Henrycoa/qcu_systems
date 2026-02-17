import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  User, 
  CheckSquare, 
  FileText, 
  Table, 
  File, 
  MessageCircle, 
  Inbox, 
  FileSpreadsheet, 
  PieChart, 
  Grid, 
  LogIn,
  ShoppingCart,
  BarChart2,
  TrendingUp,
  Briefcase,
  Package,
  Type,
  Radio,
  SlidersHorizontal,
  ToggleRight,
  CircleDot,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const Sidebar = ({ isVisible, onNavigate, activePage }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (itemName, page) => {
    setActiveItem(itemName);
    if (onNavigate && page) {
      onNavigate(page);
    }
  };

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuGroups = [
    {
      label: 'MAIN MENU',
      items: [
        { 
          name: 'Dashboard', 
          icon: <Home size={20} />, 
          page: 'dashboard',
          hasSub: true,
          subItems: [
            { name: 'eCommerce', icon: <ShoppingCart size={18} />, page: 'ecommerce', isPro: true },
            { name: 'Analytics', icon: <BarChart2 size={18} />, page: 'analytics', isPro: true },
            { name: 'Marketing', icon: <TrendingUp size={18} />, page: 'marketing', isPro: true },
            { name: 'CRM', icon: <Briefcase size={18} />, page: 'crm', isPro: true },
            { name: 'Stocks', icon: <Package size={18} />, page: 'stocks', isPro: true },
          ]
        },
        { 
          name: 'Calendar', 
          icon: <Calendar size={20} />, 
          page: 'calendar'
        },
        { 
          name: 'Profile', 
          icon: <User size={20} />, 
          page: 'profile'
        },
        { 
          name: 'Tasks', 
          icon: <CheckSquare size={20} />, 
          page: 'tasks'
        },
        { 
          name: 'Forms', 
          icon: <FileText size={20} />, 
          page: 'forms'
        },
        { 
          name: 'Tables', 
          icon: <Table size={20} />, 
          page: 'tables'
        },
        { 
          name: 'Pages', 
          icon: <File size={20} />, 
          page: 'pages'
        },
      ]
    },
    {
      label: 'SUPPORT',
      items: [
        { 
          name: 'Messages', 
          icon: <MessageCircle size={20} />, 
          page: 'messages',
          isPro: true
        },
        { 
          name: 'Inbox', 
          icon: <Inbox size={20} />, 
          page: 'inbox',
          isPro: true
        },
        { 
          name: 'Invoice', 
          icon: <FileSpreadsheet size={20} />, 
          page: 'invoice',
          isPro: true
        },
      ]
    },
    {
      label: 'OTHERS',
      items: [
        { 
          name: 'Charts', 
          icon: <PieChart size={20} />, 
          page: 'charts'
        },
        { 
          name: 'UI Elements', 
          icon: <Grid size={20} />, 
          page: 'ui',
          hasSub: true,
          subItems: [
            { name: 'Autocomplete', icon: <Type size={18} />, page: 'autocomplete' },
            { name: 'Checkbox', icon: <CheckSquare size={18} />, page: 'checkbox' },
            { name: 'Radio', icon: <Radio size={18} />, page: 'radio' },
            { name: 'Slider', icon: <SlidersHorizontal size={18} />, page: 'slider' },
            { name: 'Switch', icon: <ToggleRight size={18} />, page: 'switch' },
            { name: 'Buttons', icon: <CircleDot size={18} />, page: 'buttons' },
            { name: 'Forms', icon: <FileText size={18} />, page: 'forms' },
            { name: 'Alerts', icon: <AlertCircle size={18} />, page: 'alerts' },
          ]
        },
        { 
          name: 'Authentication', 
          icon: <LogIn size={20} />, 
          page: 'auth'
        },
      ]
    }
  ];

  return (
    <div 
      className={`
        w-72 h-screen bg-white flex flex-col border-r border-gray-100 shadow-sm 
        overflow-y-auto transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{ flexShrink: 0 }}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="relative w-10 h-10 flex flex-wrap content-start">
          <div className="w-5 h-8 bg-[#1a56db] rounded-tl-lg rounded-bl-lg"></div>
          <div className="w-5 h-4 bg-[#1a56db] rounded-tr-lg"></div>
          <div className="w-5 h-4 bg-[#facc15] rounded-br-lg"></div>
        </div>
        <span className="text-2xl font-bold text-[#2a3547]">Flexy</span>
      </div>

      <nav className="flex-1 px-4 pb-4">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="mb-6">
            <h3 className="px-4 text-[11px] font-bold text-[#7c8fac] mb-2 tracking-wider">
              {group.label}
            </h3>
            
            <div className="space-y-1">
              {group.items.map((item, iIdx) => (
                <React.Fragment key={iIdx}>
                  <button
                    onClick={() => {
                      if (item.hasSub) {
                        toggleMenu(item.name);
                      } else {
                        handleItemClick(item.name, item.page);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                      activeItem === item.name || item.subItems?.some(sub => activePage === sub.page)
                      ? 'bg-[#1e4db7] text-white' 
                      : 'text-[#2a3547] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`${
                        activeItem === item.name || item.subItems?.some(sub => activePage === sub.page)
                        ? 'text-white' 
                        : 'text-[#7c8fac] group-hover:text-[#1e4db7]'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="text-[15px] font-medium leading-none">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.isPro && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          activeItem === item.name || item.subItems?.some(sub => activePage === sub.page)
                          ? 'bg-white/20 border-white/30 text-white' 
                          : 'bg-[#eef2ff] border-[#e0e7ff] text-[#1e4db7]'
                        }`}>
                          Pro
                        </span>
                      )}

                      {item.hasSub && (
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeItem === item.name || item.subItems?.some(sub => activePage === sub.page)
                            ? 'text-white' 
                            : 'text-[#7c8fac]'
                          } ${expandedMenus[item.name] ? '' : 'rotate-180'}`}
                        />
                      )}
                    </div>
                  </button>

                  {item.hasSub && expandedMenus[item.name] && item.subItems && (
                    <div className="ml-9 mt-1 mb-2 space-y-1">
                      {item.subItems.map((subItem, subIdx) => (
                        <button
                          key={subIdx}
                          onClick={() => {
                            setActiveItem(item.name);
                            handleItemClick(subItem.name, subItem.page);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                            activePage === subItem.page
                            ? 'bg-[#eef2ff] text-[#1e4db7]' 
                            : 'text-[#7c8fac] hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`${
                              activePage === subItem.page
                              ? 'text-[#1e4db7]' 
                              : 'text-[#7c8fac] group-hover:text-[#1e4db7]'
                            }`}>
                              {subItem.icon}
                            </span>
                            <span className="text-[14px] font-medium leading-none">
                              {subItem.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;