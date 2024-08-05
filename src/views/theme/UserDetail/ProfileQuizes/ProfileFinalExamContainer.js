import React from 'react'
import styles from './ProfileFinalExamContainer.module.css'
import FinalExamsTable from '../FinalExamsTable/FinalExamsTable'

function ProfileFinalExamContainer() {
  return (
    <div className={`${styles.profile_quizes_container}`}>
      <div className={`${styles.header}`}>
        <p>Enrolled Quizes</p>
      </div>

      <div className={`${styles.btns}`}>
        <FinalExamsTable />
      </div>
    </div>
  )
}
export default ProfileFinalExamContainer
