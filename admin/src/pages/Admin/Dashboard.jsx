import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const {
    aToken,
    getDashData,
    cancelAppointment,
    dashData
  } = useContext(AdminContext)

  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // Dashboard cards data
  const dashboardCards = [
    {
      title: 'Doctors',
      value: dashData?.doctors || 0,
      icon: assets.doctor_icon
    },
    {
      title: 'Appointments',
      value: dashData?.appointments || 0,
      icon: assets.appointments_icon
    },
    {
      title: 'Patients',
      value: dashData?.patients || 0,
      icon: assets.patients_icon
    }
  ]

  // Loading state
  if (!dashData) {
    return (
      <div className='m-5 text-lg text-gray-500'>
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className='m-5'>

      {/* Top Cards */}
      <div className='flex flex-wrap gap-4'>

        {dashboardCards.map((card, index) => (

          <div
            key={index}
            className='flex items-center gap-3 bg-white p-5 min-w-52 rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer'
          >

            <img
              className='w-14'
              src={card.icon}
              alt={card.title}
            />

            <div>
              <p className='text-2xl font-bold text-gray-700'>
                {card.value}
              </p>

              <p className='text-gray-500'>
                {card.title}
              </p>
            </div>

          </div>

        ))}

      </div>

      {/* Latest Bookings */}
      <div className='bg-white mt-10 rounded-lg border shadow-sm overflow-hidden'>

        {/* Header */}
        <div className='flex items-center gap-3 px-5 py-4 border-b bg-gray-50'>

          <img
            src={assets.list_icon}
            alt="List Icon"
          />

          <p className='font-semibold text-gray-700'>
            Latest Bookings
          </p>

        </div>

        {/* Appointment List */}
        <div>

          {dashData.latestAppointments?.slice(0, 5).map((item) => (

            <div
              key={item._id}
              className='flex items-center gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-all'
            >

              {/* Doctor Image */}
              <img
                className='w-12 h-12 rounded-full object-cover'
                src={item.docData.image}
                alt={item.docData.name}
              />

              {/* Appointment Info */}
              <div className='flex-1'>

                <p className='font-medium text-gray-800'>
                  {item.docData.name}
                </p>

                <p className='text-sm text-gray-500'>
                  Booking on {slotDateFormat(item.slotDate)}
                </p>

              </div>

              {/* Status */}
              {item.cancelled ? (

                <p className='text-red-500 text-sm font-medium'>
                  Cancelled
                </p>

              ) : item.isCompleted ? (

                <p className='text-green-500 text-sm font-medium'>
                  Completed
                </p>

              ) : (

                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='hover:scale-110 transition-all'
                >

                  <img
                    className='w-9'
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />

                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard