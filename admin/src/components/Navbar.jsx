import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const userPanelUrl = import.meta.env.VITE_USER_APP_URL
  const isAdmin = !!aToken
  const currentRole = isAdmin ? 'Administrator' : 'Doctor'
  const initials = isAdmin ? 'AD' : 'DR'

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  const logout = () => {
    if (dToken) { setDToken(''); localStorage.removeItem('dToken') }
    if (aToken) { setAToken(''); localStorage.removeItem('aToken') }
    navigate('/login')
  }

  const goToUserPanel = () => {
    if (userPanelUrl) window.location.href = userPanelUrl
  }

  const handleLogoClick = () => {
    if (aToken) navigate('/admin-dashboard')
    else if (dToken) navigate('/doctor-dashboard')
    else navigate('/login')
  }

  // Role-aware color tokens
  const roleColors = isAdmin
    ? {
        accent: 'border-t-2 border-t-blue-400',
        badge: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-400',
        avatar: 'bg-blue-50 text-blue-700',
        icon: 'bg-blue-50 text-blue-600',
      }
    : {
        accent: 'border-t-2 border-t-teal-400',
        badge: 'bg-teal-50 text-teal-700 border-teal-200',
        dot: 'bg-teal-400',
        avatar: 'bg-teal-50 text-teal-700',
        icon: 'bg-teal-50 text-teal-600',
      }

  return (
    <nav className={`flex items-center justify-between px-6 sm:px-10 bg-white border-b border-gray-100 shadow-sm relative ${roleColors.accent}`}
      style={{ height: '60px' }}>

      {/* Left */}
      <div className='flex items-center gap-3'>

        {/* Logo */}
        <div className='flex items-center gap-2 cursor-pointer' onClick={handleLogoClick}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${roleColors.icon}`}>
            P
          </div>
          <span className='text-[15px] font-semibold text-gray-800 tracking-tight hidden sm:block'>
            Appointy
          </span>
        </div>

        {/* Divider */}
        <div className='w-px h-5 bg-gray-200 hidden sm:block' />

        {/* Role badge */}
        <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${roleColors.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${roleColors.dot}`} />
          {currentRole}
        </span>

        {/* User Panel — only on dashboard */}
        {isOnDashboard && (
          <button
            onClick={goToUserPanel}
            className='flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            User Panel
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </button>
        )}
      </div>

      {/* Right */}
      <div className='flex items-center gap-2.5'>

        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${roleColors.avatar}`}>
          {initials}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className='flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all duration-150'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar