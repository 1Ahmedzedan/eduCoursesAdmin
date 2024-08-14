import React, { useEffect, useState } from 'react'
// import { dateFormat } from '../../utils/helper'
import styles from './ProfileInfo.module.css'
import { Link, useParams } from 'react-router-dom'
import userIcon from '../../../../assets/images/userIcon.png'
import axios from 'axios'

function ProfileInfo() {
  const { userID } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`https://courses-website-q0gf.onrender.com/api/user?userId=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error)
        setError(error.response.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading ...</div>
  if (error) return <div>{error}</div>
  return (
    <div className={`${styles.profile_info_container}`}>
      <div className={`${styles.header}`}>
        <p>User Profile</p>
      </div>
      <div className={`${styles.profile_info}`}>
        <div className={`${styles.info}`}>
          <img src={user?.image === null ? userIcon : user?.image} alt="user" />
        </div>
        <div className={`${styles.titles}`}>
          <p>Name</p>
          <p className={`${styles.value}`}>{user?.name}</p>
          <p>Email</p>
          <p className={`${styles.value}`}>{user?.email}</p>
          <p>Phone Number</p>
          <p className={`${styles.value}`}>{user?.phone}</p>
          <p>Parent Phone</p>
          <p className={`${styles.value}`}>{user?.parentPhone}</p>
          <p>Registeration Date</p>
          <p className={`${styles.value}`}>{user?.createdDate}</p>
          <p> Referral Code</p>
          <p className={`${styles.value}`}>{user?.referralCode}</p>
          <p> Enorlled Courses</p>
          <Link to={`/userCourses/${userID}`}>View</Link>
          <p> Attended Exams</p>
          <Link to={`/userAttendedFinalExams/${userID}`}>View</Link>
          <p> Attended Quizes</p>
          <Link to={`/userAttendedQuizes/${userID}`}>View</Link>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo
