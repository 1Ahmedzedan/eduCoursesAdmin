import React, { useEffect, useState } from 'react'
import Question from '../Question/Question'
import styles from './QuizAnswerContainer.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function QuizAnswerContainer() {
  const { lessonID } = useParams()
  const [questions, setQuistions] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token')
    axios
      .get(`https://courses-website-q0gf.onrender.com/api/lesson?lessonId=${lessonID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        setQuistions(response.data.lessonQuestions)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading ....</div>
  return (
    <div className={`${styles.question_container}`}>
      <button className={`${styles.add_btn}`}>Add Question</button>
      {!questions?.length ? (
        <div>Empty</div>
      ) : (
        questions?.map((question, index) => (
          <Question
            type="answer"
            question={question}
            questionIndex={index}
            key={question.questionId}
          />
        ))
      )}
    </div>
  )
}

export default QuizAnswerContainer
