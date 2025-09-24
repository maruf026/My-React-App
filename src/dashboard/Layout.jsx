import React, { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaHeart,
  FaInbox,
  FaList,
  FaWarehouse,
  FaDollarSign,
  FaCalendar,
  FaTasks,
  FaAddressBook,
  FaFileInvoice,
  FaPuzzlePiece,
  FaUsers,
  FaTable,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaShoppingCart,
  FaChartLine,
  FaClock,
  FaCube,
  FaApple,
  FaPlus,
  FaListUl,
  FaUser,
  FaShieldAlt,
  FaMoon,
  FaSun
} from 'react-icons/fa';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark class to document root
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FaSun className="text-yellow-500 text-lg" />
      ) : (
        <FaMoon className="text-gray-600 text-lg" />
      )}
    </button>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const navigate = useNavigate();

  // Toggle submenu expansion
  const toggleSubmenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };



  // Navigation items with submenu support
  const navigationItems = [
    { name: 'Dashboard', icon: FaHome, path: '/', active: true },
    { 
      name: 'Products', 
      icon: FaBox, 
      path: '/products',
      hasSubmenu: true,
      submenu: [
        { name: 'Add Product', icon: FaPlus, path: '/' },
        { name: 'All Product', icon: FaListUl, path: '/' }
      ]
    },
    { name: 'Favorites', icon: FaHeart, path: '/favorites' },
    { name: 'Inbox', icon: FaInbox, path: '/' },
    { name: 'Order Lists', icon: FaList, path: '/orders' },
    { name: 'Product Stock', icon: FaWarehouse, path: '/stock' }
  ];

  const pageItems = [
    { name: 'Pricing', icon: FaDollarSign, path: '/pricing' },
    { name: 'Calendar', icon: FaCalendar, path: '/calendar' },
    { name: 'To-Do', icon: FaTasks, path: '/todo' },
    { name: 'Contact', icon: FaAddressBook, path: '/contact' },
    { name: 'Invoice', icon: FaFileInvoice, path: '/invoice' },
    { name: 'UI Elements', icon: FaPuzzlePiece, path: '/ui-elements' },
    { name: 'Team', icon: FaUsers, path: '/team' },
    { name: 'Table', icon: FaTable, path: '/table' }
  ];

  // Additional menu items
  const additionalItems = [
    { name: 'User Management', icon: FaUser, path: '/user-management' },
    { name: 'Security', icon: FaShieldAlt, path: '/security' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };



  const NavigationItem = ({ item, onClick }) => {
    const IconComponent = item.icon;
    const isExpanded = expandedMenus[item.name];

    if (item.hasSubmenu) {
      return (
        <div>
          <button
            onClick={() => toggleSubmenu(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'text-white bg-blue-600'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconComponent className="text-sm" />
              <span className="font-medium">{item.name}</span>
            </div>
            {isExpanded ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>
          
          {/* Submenu */}
          {isExpanded && item.submenu && (
            <div className="ml-4 mt-2 space-y-1">
              {item.submenu.map((subItem) => {
                const SubIconComponent = subItem.icon;
                return (
                  <button
                    key={subItem.name}
                    onClick={() => onClick(subItem.path)}
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <SubIconComponent className="text-xs" />
                    <span>{subItem.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        onClick={() => onClick(item.path)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          item.active
            ? 'text-white bg-blue-600'
            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
        }`}
      >
        <IconComponent className="text-sm" />
        <span className="font-medium">{item.name}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside className={`w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative z-30 h-full overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaCube className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">DashStack</span>
          </div>
        </div>
        
        <nav className="mt-6 pb-6">
          <div className="px-6 mb-8 space-y-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                onClick={handleNavigation}
              />
            ))}
          </div>
          
          <div className="px-6">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">PAGES</p>
            <div className="space-y-2">
              {pageItems.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                  onClick={handleNavigation}
                />
              ))}
            </div>
          </div>

          {/* Additional Menu Items */}
          <div className="px-6 mt-8">
            <div className="space-y-2">
              {additionalItems.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                  onClick={handleNavigation}
                />
              ))}
            </div>
          </div>
          
          <div className="px-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <NavigationItem
                item={{ name: 'Settings', icon: FaCog, path: '/settings' }}
                onClick={handleNavigation}
              />
              <NavigationItem
                item={{ name: 'Logout', icon: FaSignOutAlt, path: '/logout' }}
                onClick={handleNavigation}
              />
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 lg:p-6 transition-colors duration-200">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FaBars className="text-xl" />
            </button>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 dark:text-gray-500 text-sm" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            
            {/* Header Right */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
              
              <div className="flex items-center space-x-2 text-sm">
                
                <span className="hidden sm:inline text-gray-700 dark:text-gray-300">English</span>
                <FaChevronDown className="text-gray-400 dark:text-gray-500 text-xs" />
              </div>
              
              <div className="relative">
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 relative">
                  <FaBell className="text-lg" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <FaUsers className="text-gray-600 dark:text-gray-300 text-sm" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Abdur Rahman</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
                <FaChevronDown className="text-gray-400 dark:text-gray-500 text-xs" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 transition-colors duration-200">
      

          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Main App component with ThemeProvider
const DashboardWithTheme = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};

export default DashboardWithTheme;