import React, { useEffect, useState } from 'react'
import styles from './QuizesTable.module.css'
import QuizesTableRow from './QuizesTableRow'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function QuizesTable() {
  const { userID } = useParams()
  const [attendedExams, setAttendedExams] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`https://courses-website-q0gf.onrender.com/api/lessons/info?userId=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  if (attendedExams.length === 0) {
    return <div className={`${styles.empty_table}`}>Not Exist Attended Lesson Quiz</div>
  }

  return (
    <table className={`${styles.quiz_table}`}>
      <tbody>
        <tr>
          <td>Course Name</td>
          <td>Lesson Name</td>
          <td>Date</td>
          <td>Status</td>
        </tr>
        {attendedExams.map((lesson) => (
          <QuizesTableRow lesson={lesson} key={lesson.lessonId} />
        ))}
      </tbody>
    </table>
  )
}
export default QuizesTable
