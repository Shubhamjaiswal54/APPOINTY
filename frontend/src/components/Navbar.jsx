import React, { useContext, useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
    setShowMenu(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showMenu])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/doctors', label: 'All Doctors' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const userInitial = userData?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <>
      <nav className='flex items-center justify-between px-6 sm:px-10 bg-white border-b border-gray-100 h-16 relative z-10'>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-2 cursor-pointer select-none'
        >
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm'>
            Rx
          </div>
          <span className='text-[15px] font-semibold text-gray-800 tracking-tight hidden sm:block'>
            Appointy
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className='hidden md:flex items-center gap-1'>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 
                   ${isActive
                     ? 'text-gray-900 font-semibold after:absolute after:bottom-[-20px] after:left-3 after:right-3 after:h-0.5 after:bg-teal-500 after:rounded-t'
                     : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                   }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className='flex items-center gap-2.5'>

          {/* Admin Panel Button */}
          <button
            onClick={() => window.open(import.meta.env.VITE_ADMIN_APP_URL || 'http://localhost:5174', '_blank')}
            className='hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Admin
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </button>

          {token && userData ? (
            /* Avatar + Dropdown */
            <div ref={dropdownRef} className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center gap-2 cursor-pointer select-none'
              >
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt='Profile'
                    className='w-9 h-9 rounded-full object-cover ring-2 ring-teal-400 ring-offset-1'
                  />
                ) : (
                  <div className='w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-teal-400 ring-offset-1'>
                    {userInitial}
                  </div>
                )}
                <span className='hidden md:block text-sm font-medium text-gray-700'>
                  {userData.name?.split(' ')[0]}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`hidden md:block w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className='absolute top-[calc(100%+10px)] right-0 w-52 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-100/80 py-1.5 z-50'>

                  {/* Header */}
                  <div className='px-4 py-2.5 border-b border-gray-100 mb-1'>
                    <p className='text-sm font-semibold text-gray-800'>{userData.name}</p>
                    <p className='text-xs text-gray-400 mt-0.5 truncate'>{userData.email}</p>
                  </div>

                  <button
                    onClick={() => { navigate('my-profile'); setShowDropdown(false) }}
                    className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Profile
                  </button>

                  <button
                    onClick={() => { navigate('my-appointments'); setShowDropdown(false) }}
                    className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    My Appointments
                  </button>

                  <div className='border-t border-gray-100 mt-1 pt-1'>
                    <button
                      onClick={logout}
                      className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='hidden md:block text-sm font-medium bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors'
            >
              Create account
            </button>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setShowMenu(true)}
            className='md:hidden w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500'
            aria-label='Open menu'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div
          className='md:hidden fixed inset-0 bg-black/40 z-40'
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs'>
              Rx
            </div>
            <span className='text-sm font-semibold text-gray-800'>Appointy</span>
          </div>
          <button
            onClick={() => setShowMenu(false)}
            className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className='flex-1 overflow-y-auto py-3 px-3'>
          <ul className='space-y-0.5'>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all
                     ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{label}</span>
                      {isActive
                        ? <span className='w-1.5 h-1.5 rounded-full bg-teal-500' />
                        : <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      }
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className='border-t border-gray-100 p-3 space-y-2'>
          {token && userData ? (
            <>
              <div className='flex items-center gap-3 px-3 py-2'>
                {userData.image ? (
                  <img src={userData.image} alt='Profile' className='w-9 h-9 rounded-full object-cover' />
                ) : (
                  <div className='w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold'>
                    {userInitial}
                  </div>
                )}
                <div>
                  <p className='text-sm font-semibold text-gray-800'>{userData.name}</p>
                  <p className='text-xs text-gray-400 truncate'>{userData.email}</p>
                </div>
              </div>
              <button
                onClick={() => { navigate('my-profile'); setShowMenu(false) }}
                className='w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors'
              >
                My Profile
              </button>
              <button
                onClick={() => { navigate('my-appointments'); setShowMenu(false) }}
                className='w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors'
              >
                My Appointments
              </button>
              <button
                onClick={logout}
                className='w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate('/login'); setShowMenu(false) }}
              className='w-full bg-teal-600 text-white text-sm font-medium py-3 rounded-xl hover:bg-teal-700 transition-colors'
            >
              Create account
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar