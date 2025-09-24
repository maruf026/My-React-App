import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaInbox,
  FaStar,
  FaPaperPlane,
  FaFileAlt,
  FaExclamationTriangle,
  FaArchive,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Inbox = () => {
  const [users, setUsers] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('Inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch users data from DummyJSON API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        
        // Transform users into email format 
        const emailData = data.users.map((user, index) => ({
          id: user.id,
          sender: `${user.firstName} ${user.lastName}`,
          subject: getEmailSubject(index),
          preview: getEmailPreview(index),
          time: getEmailTime(index),
          isStarred: [3, 6, 8].includes(index), // Anthony Briggs, Harvey Manning, Fanny Weaver
          isRead: Math.random() > 0.4,
          label: getEmailLabel(index),
          avatar: user.image,
          email: user.email,
        }));
        
        setUsers(emailData);
        setFilteredEmails(emailData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get specific email subjects
  const getEmailSubject = (index) => {
    const subjects = [
      'Our Bachelor of Commerce program is ACBSP-accredited.',
      'Get Best Advertiser In Your Side Pocket',
      'Vacation Home Rental Success',
      'Free Classifieds Using Them To Promote Your Stuff Online',
      'Enhance Your Brand Potential With Giant Advertising Blimps',
      'Always Look On The Bright Side Of Life',
      'Curling Irons Are As Individual As The Women Who Use Them',
      'Our Bachelor of Commerce program is ACBSP-accredited.',
      'Get Best Advertiser In Your Side Pocket',
      'Free Classifieds Using Them To Promote Your Stuff Online',
      'Enhance Your Brand Potential With Giant Advertising Blimps',
      'Vacation Home Rental Success'
    ];
    return subjects[index % subjects.length];
  };

  const getEmailPreview = () => {
    // Empty preview 
    return '';
  };

  const getEmailTime = (index) => {
    const times = ['8:38 AM', '8:13 AM', '7:52 PM', '7:52 PM', '4:13 PM', '3:52 PM', '2:30 PM', '8:38 AM', '8:13 AM', '7:52 PM', '4:13 PM', '7:52 PM'];
    return times[index % times.length];
  };

  const getEmailLabel = (index) => {
    const labels = ['Primary', 'Work', 'Friends', '', 'Social', 'Friends', '', 'Primary', 'Work', '', 'Social', 'Friends'];
    return labels[index % labels.length];
  };


  // Sidebar navigation items 
  const sidebarItems = [
    { name: 'Inbox', icon: FaInbox, count: 1253, active: selectedLabel === 'Inbox' },
    { name: 'Starred', icon: FaStar, count: 245, active: selectedLabel === 'Starred' },
    { name: 'Sent', icon: FaPaperPlane, count: 24532, active: selectedLabel === 'Sent' },
    { name: 'Draft', icon: FaFileAlt, count: 9, active: selectedLabel === 'Draft' },
    { name: 'Spam', icon: FaExclamationTriangle, count: 14, active: selectedLabel === 'Spam' },
    { name: 'Important', icon: FaArchive, count: 18, active: selectedLabel === 'Important' },
    { name: 'Bin', icon: FaTrash, count: 9, active: selectedLabel === 'Bin' }
  ];

  // Label colors 
  const labelColors = {
    'Primary': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'Work': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'Social': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Friends': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    // Close sidebar on mobile after selecting email
    setSidebarOpen(false);
  };

  const handleDeleteEmail = (emailId, event) => {
    event.stopPropagation();
    const updatedUsers = users.filter(email => email.id !== emailId);
    const updatedFiltered = filteredEmails.filter(email => email.id !== emailId);
    
    setUsers(updatedUsers);
    setFilteredEmails(updatedFiltered);
    
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const handleSidebarItemClick = (itemName) => {
    setSelectedLabel(itemName);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-60 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:block`}>
        
        {/* Mobile Close Button */}
        <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Inbox</h1>
          <button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200">
            <FaPlus className="text-xs" />
            Compose
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">My Email</p>
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleSidebarItemClick(item.name)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors duration-200 ${
                    item.active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="text-xs" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.count}</span>
                </button>
              );
            })}
          </div>

          {/* Labels Section */}
          <div className="mt-6">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Label</p>
            <div className="space-y-1">
              {['Primary', 'Social', 'Work', 'Friends'].map((label) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    label === 'Primary' ? 'bg-green-500' :
                    label === 'Social' ? 'bg-blue-500' :
                    label === 'Work' ? 'bg-orange-500' : 'bg-pink-500'
                  }`}></div>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Create New Label */}
          <button className="w-full mt-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1.5 rounded text-sm flex items-center gap-2 transition-colors duration-200">
            <FaPlus className="text-xs" />
            Create New Label
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <FaBars className="text-lg" />
            </button>
            <h1 className="text-lg font-medium text-gray-900 dark:text-white">Inbox</h1>
            <div className="w-10"></div> {/* Spacer for center alignment */}
          </div>
        </div>

        {/* Main Email Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 border border-blue-400 dark:border-blue-500 m-3 lg:m-6 rounded transition-colors duration-200">
          {/* Search Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-3 lg:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Search mail"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200">
                  <FaArchive className="text-sm" />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200">
                  <FaTrash className="text-sm" />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200">
                  <FaEllipsisV className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            <div>
              {filteredEmails.slice(0, 12).map((email) => (
                <div
                  key={email.id}
                  onClick={() => handleEmailSelect(email)}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  {/* Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Star */}
                  <button className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <FaStar className={`text-sm ${
                      email.isStarred
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`} />
                  </button>

                  {/* Sender */}
                  <div className="flex-shrink-0 w-20 sm:w-32">
                    <p className={`text-xs sm:text-sm truncate ${
                      !email.isRead
                        ? 'font-medium text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {email.sender}
                    </p>
                  </div>

                  {/* Label */}
                  {email.label && (
                    <div className="flex-shrink-0 hidden sm:block">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        labelColors[email.label] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {email.label}
                      </span>
                    </div>
                  )}

                  {/* Subject */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm truncate ${
                      !email.isRead
                        ? 'font-medium text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {email.subject}
                    </p>
                  </div>

                  {/* Time */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{email.time}</p>
                  </div>

                  {/* Delete Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => handleDeleteEmail(email.id, e)}
                      className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
                      title="Delete email"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEmails.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <FaInbox className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchTerm ? 'No emails found' : 'Your inbox is empty'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms' : 'You have no emails in your inbox'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredEmails.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 px-3 lg:px-4 py-3 bg-gray-50 dark:bg-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                    Showing 1-{Math.min(filteredEmails.length, 12)} of {filteredEmails.length}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200">
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200">
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Preview Panel - Desktop Only */}
      {selectedEmail && (
        <div className="hidden xl:flex w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-col transition-colors duration-200">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedEmail.subject}
              </h3>
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xl transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={selectedEmail.avatar}
                alt={selectedEmail.sender}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkMyMS4xIDI2IDIyIDE2LjkgMjIgMThWMjJDMjIgMjMuMSAyMS4xIDI0IDIwIDI0QzE4LjkgMjQgMTggMjMuMSAxOCAyMlYxOEMxOCAxNi45IDE4LjkgMTYgMjAgMTZaIiBmaWxsPSIjOUI5Qjk4Ci8+Cjwvc3ZnPg==';
                }}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{selectedEmail.sender}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedEmail.email}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedEmail.subject}
            </p>
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={(e) => {
                handleDeleteEmail(selectedEmail.id, e);
                setSelectedEmail(null);
              }}
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-2 px-4 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <FaTrash className="text-xs" />
              Delete Email
            </button>
          </div>
        </div>
      )}

      {/* Mobile Email Preview Modal */}
      {selectedEmail && (
        <div className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white dark:bg-gray-800 w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {selectedEmail.subject}
                </h3>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xl ml-2"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={selectedEmail.avatar}
                  alt={selectedEmail.sender}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ci8+CjxwYXRoIGQ9Ik0yMCAyNkMyMS4xIDI2IDIyIDE2LjkgMjIgMThWMjJDMjIgMjMuMSAyMS4xIDI0IDIwIDI0QzE4LjkgMjQgMTggMjMuMSAxOCAyMlYxOEMxOCAxNi45IDE4LjkgMTYgMjAgMTZaIiBmaWxsPSIjOUI5Qjk4Ii8+Cjwvc3ZnPg==';
                  }}
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEmail.sender}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedEmail.email}</p>
                </div>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-60">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedEmail.subject}
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={(e) => {
                  handleDeleteEmail(selectedEmail.id, e);
                  setSelectedEmail(null);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <FaTrash className="text-xs" />
                Delete Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;



