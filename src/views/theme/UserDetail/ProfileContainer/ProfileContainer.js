import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ProfileNavbar from '../ProfileNavbar/ProfileNavbar'
import styles from './ProfileContainer.module.css'
import { stringify } from 'postcss'
import axios from 'axios'
import { base_url } from '../../../../constant'

function ProfileContainer() {
  const { userID } = useParams()
  const [loading, setLoading] = useState()
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`${base_url}/api/user?userId=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const user = JSON.stringify(response.data)
        localStorage.setItem('user', user)
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
    <div>
      <div className={`${styles.profile_container} my-5`}>
        <div className={`${styles.navbar_container}`}>
          <ProfileNavbar />
        </div>
        <div className={`${styles.page_container}`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default ProfileContainer
