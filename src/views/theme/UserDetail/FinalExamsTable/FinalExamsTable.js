import React from 'react'
import { useGetUser } from '../../hooks/Auth/useGetUser'
import { useGetAttendedExams } from '../../hooks/profile/useGetAttendedExams'
import Loader from '../Loader/Loader'
import styles from './FinalExamsTable.module.css'
import TableRow from './TableRow'

function FinalExamsTable() {
  const { user } = useGetUser()
  const { attendedExams, isLoading } = useGetAttendedExams(user.id, 'finalExams')

  if (isLoading) return <Loader type="mini" />

  if (attendedExams.length === 0) {
    return <div className={`${styles.empty_table}`}>Not Exist Attended Final Exam</div>
  }

  return (
    <table className={`${styles.quiz_table}`}>
      <tbody>
        <tr>
          <td>Course Name</td>
          <td>Date</td>
          <td>Grade</td>
          <td></td>
        </tr>
        {attendedExams.map((finalExam) => (
          <TableRow finalExam={finalExam} key={finalExam.courseId} />
        ))}
      </tbody>
    </table>
  )
}
export default FinalExamsTable
