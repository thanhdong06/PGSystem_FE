import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  // Focus search input when sidebar opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 bg-base-200 z-30 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <Link to="/home" className="text-xl font-bold text-primary" onClick={toggleSidebar}>
          Pregnancy Growth 
          </Link>
          <button 
            onClick={toggleSidebar}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              className="input input-bordered w-full pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="flex items-center gap-1 text-sm text-base-content/50">
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] pb-20">
          {/* Main Navigation Section */}
          <div className="px-4 py-2">
            <div className="text-base-content/60 text-sm font-semibold uppercase tracking-wider mb-2 px-2">
              Main Navigation
            </div>
            
            <ul className="menu menu-md p-0 rounded-md">
              <li>
                <Link to="/home" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Membership & Blog Section */}
          <div className="px-4 py-2 mt-2">
            <div className="text-base-content/60 text-sm font-semibold uppercase tracking-wider mb-2 px-2">
              Membership & Blog
            </div>
            
            <ul className="menu menu-md p-0 rounded-md">
              <li>
                <Link to="/membership" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                  </svg>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Tools Section */}
          <div className="px-4 py-2 mt-2">
            <div className="text-base-content/60 text-sm font-semibold uppercase tracking-wider mb-2 px-2">
              Tools
            </div>
            
            <ul className="menu menu-md p-0 rounded-md">
              <li>
                <Link to="/duedatecalculation" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Due Date Calculator
                </Link>
              </li>
              <li>
                <Link to="/ovulationcalculation" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Ovulation Calculator
                </Link>
              </li>
              <li>
                <Link to="/pregnancydiagnosis" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Pregnancy Diagnosis
                </Link>
              </li>
              <li>
                <Link to="/babynamefinder" onClick={toggleSidebar} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  Baby Name Finder
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300 bg-base-200">
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;