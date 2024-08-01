import React from 'react'
import styles from './Question.module.css'

function Question({ question, questionIndex }) {
  return (
    <div className={`${styles.question_container}`}>
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
