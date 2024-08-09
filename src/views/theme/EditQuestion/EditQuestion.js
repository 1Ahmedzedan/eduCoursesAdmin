import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import { DocsExample } from 'src/components'

function EditQuestion() {
  const { QuestionIdx, lessonID, courseID } = useParams()
  const [data, setData] = useState(null)
  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [explain, setExplain] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState(null)
  const [level, setLevel] = useState('easy')
  const [free, setFree] = useState(false)
  const [isEditQuestion, setIsEditQuestion] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      question === '' ||
      option1 === '' ||
      option2 === '' ||
      option3 === '' ||
      option4 === '' ||
      (explain === '' && lessonID !== undefined)
    )
      return
    const createdQuestion = {
      id: data.id,
      lessonId: lessonID === undefined ? '' : lessonID,
      courseId: data.courseId,
      question: question,
      image: preview,
      options: [option1, option2, option3, option4],
      correctAnswer: correctAnswer,
      explanation: explain,
      free: free,
      level: level,
    }

    console.log(createdQuestion)

    setIsEditQuestion(true)
    const token = localStorage.getItem('token')
    const url =
      lessonID === undefined
        ? `https://courses-website-q0gf.onrender.com/api/course/question`
        : `https://courses-website-q0gf.onrender.com/api/lesson/question`
    axios
      .put(url, createdQuestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setQuestion('')
        setOption1('')
        setOption2('')
        setOption3('')
        setOption4('')
        setCorrectAnswer('')
        setExplain('')
        setImage('')
        setPreview(null)
      })
      .then((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsEditQuestion(false)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (lessonID === undefined) {
      axios
        .get(`https://courses-website-q0gf.onrender.com/api/course?courseId=${courseID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const q = response.data.finalQuiz[QuestionIdx]
          setData(response.data.finalQuiz[QuestionIdx])
          setQuestion(q.question)
          setOption1(q.options[0])
          setOption2(q.options[1])
          setOption3(q.options[2])
          setOption4(q.options[3])
          setExplain(q.explanation)
          setCorrectAnswer(q.correctAnswer)
          setPreview(q.image)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      axios
        .get(
          `https://courses-website-q0gf.onrender.com/api/lesson?lessonId=${lessonID}&level=${level}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          const q = response.data.lessonQuestions[QuestionIdx]
          setData(response.data.lessonQuestions[QuestionIdx])
          setQuestion(q.question)
          setOption1(q.options[0])
          setOption2(q.options[1])
          setOption3(q.options[2])
          setOption4(q.options[3])
          setExplain(q.explanation)
          setCorrectAnswer(q.correctAnswer)
          setPreview(q.image)
          setLevel(q.level)
          setFree(q.free)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isEditQuestion])

  if (isLoading) return <div>Loading ...</div>
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Question</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <div className="mb-3">
                  <CFormLabel htmlFor="question">Question</CFormLabel>
                  <CFormTextarea
                    id="question"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="option1">Option 1</CFormLabel>
                  <CFormTextarea
                    id="option1"
                    placeholder="Option 1"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="option2">Option 2</CFormLabel>
                  <CFormTextarea
                    id="option2"
                    placeholder="Option 2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="option3">Option 3</CFormLabel>
                  <CFormTextarea
                    id="option3"
                    placeholder="Option 3"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="option4">Option 4</CFormLabel>
                  <CFormTextarea
                    id="option4"
                    placeholder="Option 4"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="correctAnswer">Correct Answer</CFormLabel>
                  <CFormTextarea
                    id="correctAnswer"
                    placeholder="Correct Answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="explain">Explain</CFormLabel>
                  <CFormTextarea
                    id="explain"
                    placeholder="Explain"
                    value={explain}
                    onChange={(e) => setExplain(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Image</CFormLabel>
                  <CFormInput
                    type="file"
                    id="exampleFormControlInput1"
                    placeholder="name of course"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: '300px',
                        height: '300px',
                        marginTop: '25px',
                        borderRadius: '10%',
                      }}
                    />
                  )}
                </div>
                <div>
                  <p>Question level : </p>
                  <div className="d-flex gap-3">
                    <CFormCheck
                      type="radio"
                      name="level"
                      id="easy"
                      value="easy"
                      checked={level === 'easy'}
                      onChange={() => setLevel('easy')}
                    ></CFormCheck>
                    <CFormLabel htmlFor="easy">Easy</CFormLabel>
                  </div>
                  <div className="d-flex gap-3">
                    <CFormCheck
                      type="radio"
                      name="level"
                      id="medium"
                      value="medium"
                      checked={level === 'medium'}
                      onChange={() => setLevel('medium')}
                    ></CFormCheck>
                    <CFormLabel htmlFor="medium">Medium</CFormLabel>
                  </div>
                  <div className="d-flex gap-3">
                    <CFormCheck
                      type="radio"
                      name="level"
                      id="hard"
                      value="hard"
                      checked={level === 'hard'}
                      onChange={() => setLevel('hard')}
                    ></CFormCheck>
                    <CFormLabel htmlFor="hard">Hard</CFormLabel>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <CFormCheck
                    id="free?"
                    checked={free}
                    onChange={() => setFree((e) => !e)}
                  ></CFormCheck>
                  <CFormLabel htmlFor="free?">Is question for free ?</CFormLabel>
                </div>
                <div className="col-auto text-center">
                  <CButton
                    color="primary"
                    type="submit"
                    className="mb-3 w-25"
                    onClick={handleSubmit}
                    disabled={isEditQuestion}
                  >
                    {isEditQuestion ? 'Loading...' : 'Edit Question'}
                  </CButton>
                </div>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditQuestion
