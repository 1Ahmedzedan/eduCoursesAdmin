import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import userIcon from '../../../../assets/images/userIcon.png'
import styles from './ProfileNavbar.module.css'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoBookOutline } from 'react-icons/io5'
import { MdOutlineQuiz } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { LuWallet } from 'react-icons/lu'

function ProfileNavbar() {
  let currentPage = useLocation()
  currentPage = currentPage.pathname
  const { userID } = useParams()

  return (
    <div className={`${styles.profile_navbar}`}>
      <div className={`${styles.info}`}>
        <img src={userIcon} alt="user" />
      </div>
      <div className={`${styles.links}`}>
        <Link to={`/userDetail/${userID}/info`}>
          <div
            className={`${styles.link} ${styles.first_link} ${
              currentPage === `/userDetail/${userID}` ? styles.active_link : ''
            }`}
          >
            <span>
              <FaRegUserCircle />
            </span>
            <p>User Profile</p>
          </div>
        </Link>
        <Link to="/profile/courses">
          <div
            className={`${styles.link} ${
              currentPage === '/profile/courses' ? styles.active_link : ''
            }`}
          >
            <span>
              <IoBookOutline />
            </span>
            <p>My Courses</p>
          </div>
        </Link>
        <Link to="/profile/quizes">
          <div
            className={`${styles.link} ${
              currentPage.includes('/profile/quizes') ? styles.active_link : ''
            }`}
          >
            <span>
              <MdOutlineQuiz />
            </span>
            <p>My Quizes</p>
          </div>
        </Link>
        <Link to="/profile/wallet">
          <div
            className={`${styles.link} ${
              currentPage === '/profile/wallet' ? styles.active_link : ''
            }`}
          >
            <span>
              <LuWallet />
            </span>
            <p>My Wallet</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default ProfileNavbar
