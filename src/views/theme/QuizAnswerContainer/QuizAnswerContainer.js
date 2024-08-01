import React, { useEffect, useState } from 'react'
import Question from '../Question/Question'
import styles from './QuizAnswerContainer.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function QuizAnswerContainer() {
  const { lessonID, courseID } = useParams()
  const [questions, setQuistions] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
        // console.log(response.data.lessonQuestions)
        setQuistions(response.data.lessonQuestions)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading || questions === undefined) return <div>Loading ....</div>
  console.log(questions)
  return (
    <div className={`${styles.question_container}`}>
      <button
        className={`${styles.add_btn}`}
        onClick={() => navigate(`/addQuestion/${courseID}/${lessonID}`)}
      >
        Add Question
      </button>
      {!questions?.length ? (
        <div>Empty</div>
      ) : (
        questions?.map((question, index) => (
          <Question question={question} questionIndex={index} key={question.id} />
        ))
      )}
    </div>
  )
}

export default QuizAnswerContainer
