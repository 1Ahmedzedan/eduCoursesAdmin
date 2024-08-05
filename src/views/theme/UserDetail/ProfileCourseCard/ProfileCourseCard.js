import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfileCourseCard.module.css'

function ProfileCourseCard({ img, courseName, id }) {
  return (
    <div className={`${styles.CourseCard_container}`}>
      <div className={`${styles.img_container} h-75`}>
        <img alt="img" src={img} />
      </div>
      <h5 className="px-3 pt-3 pb-2">{courseName}</h5>
      <div className={`d-flex justify-content-end px-3 pb-3 ${styles.btn_container}`}>
        <Link to={`course/${id}`} className={`${styles.seemore_link}`}>
          <div>Start Learning</div>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCourseCard
