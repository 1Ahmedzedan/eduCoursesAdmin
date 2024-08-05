import React, { useEffect, useState } from 'react'
import styles from './FinalExamsTable.module.css'
import TableRow from './TableRow'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function FinalExamsTable() {
  const { userID } = useParams()
  const [attendedExams, setAttendedExams] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://courses-website-q0gf.onrender.com/api/courses/info?userId=${userID}`)
      .then((response) => {
        setAttendedExams(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  if (isLoading) return <div>Loading ...</div>
  if (attendedExams === undefined) return null
  console.log(attendedExams)
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
