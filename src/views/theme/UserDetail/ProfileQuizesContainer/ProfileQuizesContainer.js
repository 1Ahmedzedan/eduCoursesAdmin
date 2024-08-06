import React from 'react'
import styles from './ProfileQuizesContainer.module.css'
import QuizesTable from '../QuizesTable/QuizesTable'

function ProfileQuizesContainer() {
  return (
    <div className={`${styles.profile_quizes_container}`}>
      <div className={`${styles.header}`}>
        <p>Enrolled Quizes</p>
      </div>

      <div className={`${styles.btns}`}>
        <QuizesTable />
      </div>
    </div>
  )
}
export default ProfileQuizesContainer
