import React, { useState } from 'react'
import styles from './Question.module.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Question({ question, questionIndex, setIsDeleteQuestion }) {
  const { lessonID, courseID, level, idx } = useParams()
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  function handleDeleteQuestion() {
    const token = localStorage.getItem('token')

    setIsDeleting(true)
    const url =
      lessonID === undefined
        ? `https://92.113.26.138:8080/api/course/question?questionId=${question.id}&idx=${idx}`
        : `https://92.113.26.138:8080/api/lesson/question?questionId=${question.id}`
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setIsDeleteQuestion((e) => !e))
      .catch((error) => console.log(error))
      .finally(() => setIsDeleting(false))
  }
  return (
    <div className={`${styles.question_container} my-3`}>
      <div className={`${styles.btns_container}`}>
        <button
          className={`${styles.delete_btn}`}
          onClick={handleDeleteQuestion}
          disabled={isDeleting}
        >
          Delete
        </button>
        <button
          className={`${styles.edit_btn}`}
          onClick={() =>
            lessonID === undefined
              ? navigate(`/editQuestionPracticeTest/${courseID}/${idx}/${questionIndex}`)
              : navigate(`/editQuestion/${lessonID}/${questionIndex}/${level}`)
          }
        >
          Edit
        </button>
      </div>
      <div className={`${styles.question}`}>
        {questionIndex + 1}- {question?.question}
      </div>
      <form className={`${styles.answerForm}`}>
        {question?.options.map((option, index) => (
          <div
            className={`${styles.answer}
              ${question.correctAnswer === option ? styles.correct_option : ''}
              `}
            key={index}
          >
            <input
              type="radio"
              id={index}
              name={question.id}
              value={option}
              onChange={(e) => handleSelectAnswer(e.target.value)}
              checked={question.correctAnswer === option}
              disabled={true}
            />
            <label htmlFor={index}>{option}</label>
          </div>
        ))}
      </form>
    </div>
  )
}
export default Question
