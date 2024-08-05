import { useNavigate } from 'react-router-dom'
import styles from './FinalExamsTable.module.css'

function TableRow({ finalExam }) {
  const navigate = useNavigate()
  const grade = +finalExam.courseGrade
  const finalGrade =
    +finalExam.courseQuestions.right +
    +finalExam.courseQuestions.wrong +
    +finalExam.courseQuestions.notSolved
  const passGrade = Math.ceil(finalGrade / 2)

  return (
    <tr>
      <td>{finalExam.courseName}</td>
      <td>5-7-2024</td>
      <td>
        <div className={`${styles.grade_container}`}>
          <span
            className={
              passGrade <= grade
                ? grade === finalGrade
                  ? styles.prefect_grade
                  : styles.high_grade
                : styles.low_grade
            }
          >
            {grade}
          </span>{' '}
          / {finalGrade}
        </div>
      </td>
      <td>
        <div className={`${styles.control_btns}`}>
          <button onClick={() => navigate(`/examAnswer/${finalExam.courseId}`)}>
            Show Answers
          </button>
        </div>
      </td>
    </tr>
  )
}
export default TableRow
