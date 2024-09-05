import React, { useEffect, useState } from 'react'
import Question from '../Question/Question'
import styles from './QuizAnswerContainer.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function QuizAnswerContainer() {
  const { lessonID, courseID, level } = useParams()
  const [questions, setQuistions] = useState()
  const [loading, setLoading] = useState(false)
  const [isDeleteQuestion, setIsDeleteQuestion] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token')
    axios
      .get(
        `https://92.113.26.138:8080/api/lesson/questions?lessonId=${lessonID}&level=${level}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setQuistions(response.data)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [isDeleteQuestion])

  if (loading || questions === undefined) return <div>Loading ....</div>
  return (
    <div className={`${styles.question_container}`}>
      <button
        className={`${styles.add_btn}`}
        onClick={() => navigate(`/lessonQuestion/addQuestion/${courseID}/${lessonID}/${level}`)}
      >
        Add Question
      </button>
      {!questions?.length ? (
        <div>Empty</div>
      ) : (
        questions?.map((question, index) => (
          <Question
            question={question}
            questionIndex={index}
            key={question.id}
            setIsDeleteQuestion={setIsDeleteQuestion}
          />
        ))
      )}
    </div>
  )
}

export default QuizAnswerContainer
