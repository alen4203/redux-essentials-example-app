import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length

  const fetchNewNotifications = function () {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications{' '}
              {numUnreadNotifications > 0 && (
                <span className="badge">{numUnreadNotifications}</span>
              )}
            </Link>
          </div>
          <button onClick={fetchNewNotifications}>Refresh Notifications</button>
        </div>
      </section>
    </nav>
  )
}
