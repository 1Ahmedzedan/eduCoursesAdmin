import React, { useState } from 'react'
import styles from './Question.module.css'
import axios from 'axios'

function Question({ question, questionIndex, setIsDeleteQuestion }) {
  const [isDeleting, setIsDeleting] = useState(false)
  function handleDeleteQuestion() {
    const token = localStorage.getItem('token')

    setIsDeleting(true)
    axios
      .delete(
        `https://courses-website-q0gf.onrender.com/api/lesson/question?questionId=${question.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
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
        <button className={`${styles.edit_btn}`}>Edit</button>
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
