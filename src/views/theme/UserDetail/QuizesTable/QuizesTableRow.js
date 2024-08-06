import React from 'react'
// import passedIcon from '../../assets/images/passedIcon.png'
// import failedIcon from '../../assets/images/failedIcon.png'
// import pendingIcon from '../../assets/images/pendingIcon.png'
// import styles from './QuizesTable.module.css'
// import { useNavigate } from 'react-router-dom'

function QuizesTableRow({ lesson }) {
  // const navigate = useNavigate()

  return (
    <tr>
      <td>{lesson.courseName}</td>
      <td>{lesson.lessonName}</td>
      <td>5-7-2024</td>
      {/* <td>
        <div className={`${styles.statusContainer}`}>
          <div
            className={`${styles.statusItem}`}
            onClick={() => {
              if (lesson.lessonQuestions.right === '0') {
                toast.error('Not Exist Right Question')
                return
              } else if (!user.courses.includes(lesson.courseId)) {
                navigate(`/packages/${lesson.courseId}`)
                return
              }
              navigate(`/courses/course/lesson/quiz/${lesson.courseId}/${lesson.lessonId}/right`)
            }}
          >
            <img src={passedIcon} alt="passed" />
            <span>{lesson.lessonQuestions.right}</span>
          </div>
          <div
            className={`${styles.statusItem}`}
            onClick={() => {
              if (lesson.lessonQuestions.wrong === '0') {
                toast.error('Not Exist Wrong Question')
                return
              } else if (!user.courses.includes(lesson.courseId)) {
                navigate(`/packages/${lesson.courseId}`)
                return
              }
              navigate(`/courses/course/lesson/quiz/${lesson.courseId}/${lesson.lessonId}/wrong`)
            }}
          >
            <img src={failedIcon} alt="failed" />
            <span>{lesson.lessonQuestions.wrong}</span>
          </div>
          <div
            className={`${styles.statusItem}`}
            onClick={() => {
              if (lesson.lessonQuestions.notSolved === '0') {
                toast.error('Not Exist Not Solved Question')
                return
              } else if (!user.courses.includes(lesson.courseId)) {
                navigate(`/packages/${lesson.courseId}`)
                return
              }
              navigate(
                `/courses/course/lesson/quiz/${lesson.courseId}/${lesson.lessonId}/notSolved`,
              )
            }}
          >
            <img src={pendingIcon} alt="pending" />
            <span>{lesson.lessonQuestions.notSolved}</span>
          </div>
        </div>
      </td> */}
    </tr>
  )
}
export default QuizesTableRow
