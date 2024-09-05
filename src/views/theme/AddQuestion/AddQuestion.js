import React, { useState } from 'react'
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
import { useLocation, useParams } from 'react-router-dom'

function AddQuestion() {
  const { courseID, lessonID, level, idx } = useParams()
  

  const location = useLocation()
  const currentPath = location.pathname
  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [option5, setOption5] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [explain, setExplain] = useState('')
  const [image, setImage] = useState('')
  const [free, setFree] = useState(false)
  const [calc, setCalc] = useState(false)
  const [preview, setPreview] = useState('')
  const [explainPreview, setExplainPreview] = useState('')
  const [isCreateQuestion, setIsCreateQuestion] = useState(false)
console.log(currentPath.includes('addNewTest'));

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
  const handleExplainImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setExplainPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    
    setIsCreateQuestion(true)
    if (
      question === '' ||
      option1 === '' ||
      option2 === '' ||
      option3 === '' ||
      option4 === '' ||
      (explain === '' && lessonID !== undefined)
    )
      return

    e.preventDefault()
    const createdQuestion = {
      lessonId: lessonID === undefined ? '' : lessonID,
      courseId: courseID,
      question: question,
      image: preview,
      options: [option1, option2, option3, option4,option5],
      correctAnswer: correctAnswer,
      explanation: explain,
      free: free,
      level: level === undefined ? '' : level,
      calc: calc,
    }

    const token = localStorage.getItem('token')
    const idxPrameter = idx === undefined ? -1 : idx

    const url =
      lessonID === undefined
        ? `http://92.113.26.138:8080/api/course/question?courseId=${courseID}&idx=${idxPrameter}`
        : `http://92.113.26.138:8080/api/lesson/question?lessonId=${lessonID}&timer=${timer}`
    axios
      .post(url, createdQuestion, {
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
        setOption5('')
        setCorrectAnswer('')
        setExplain('')
        setImage('')
        setPreview('')
        setFree(false)
        setCalc(false)
      })
      .then((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsCreateQuestion(false)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Question</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                                  <p className='fw-bold'>Please Choose Correct Answer</p>

                <div className="mb-3">
                  
                  <CFormLabel htmlFor="question" style={{fontWeight:'600'}}>Question</CFormLabel>
                  <CFormTextarea
                    id="question"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
         
                  <CFormLabel htmlFor="option1" style={{fontWeight:'600'}}>Option 1</CFormLabel>
                  <CFormTextarea
                    id="option1"
                    placeholder="Option 1"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
          

                  <CFormLabel htmlFor="option2" style={{fontWeight:'600'}}>Option 2</CFormLabel>
                  <CFormTextarea
                    id="option2"
                    placeholder="Option 2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                
                  <CFormLabel htmlFor="option3" style={{fontWeight:'600'}}>Option 3</CFormLabel>
                  <CFormTextarea
                    id="option3"
                    placeholder="Option 3"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
            

                  <CFormLabel htmlFor="option4" style={{fontWeight:'600'}}>Option 4</CFormLabel>
                  <CFormTextarea
                    id="option4"
                    placeholder="Option 4"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                 
                  <CFormLabel htmlFor="option5" style={{fontWeight:'600'}}>Option 5</CFormLabel>
                  <CFormTextarea
                    id="option5"
                    placeholder="Option 5"
                    value={option5}
                    htmlFor="option5"
                    onChange={(e) => setOption5(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="correctAnswer" style={{fontWeight:'600'}}>Correct Answer</CFormLabel>
<div>
  <input type="radio" id="option-1" name="fav_language" value="option-1"onChange={()=>setCorrectAnswer(option1)}className='me-2 mb-2'/>
  <label for="option-1">Option 1</label><br/>
  <input type="radio" id="option-2" name="fav_language" value="option-2"onChange={()=>setCorrectAnswer(option2)}className='me-2 mb-2'/>
  <label for="option-2">Option 2</label><br/>
  <input type="radio" id="option-3" name="fav_language" value="option-3"onChange={()=>setCorrectAnswer(option3)}className='me-2 mb-2'/>
  <label for="option-3">Option 3</label><br/>
  <input type="radio" id="option-4" name="fav_language" value="option-4"onChange={()=>setCorrectAnswer(option4)}className='me-2 mb-2'/>
  <label for="option-4">Option 4</label><br/>
  <input type="radio" id="option-5" name="fav_language" value="option-5"onChange={()=>setCorrectAnswer(option5)}className='me-2 mb-2'/>
  <label for="option-5">Option 5</label>
</div>
<div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1" style={{fontWeight:'600'}}>Question Image</CFormLabel>
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
                  {/* <CFormTextarea
                    id="correctAnswer"
                    placeholder="Correct Answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  ></CFormTextarea> */}
                </div>
                {!currentPath.includes('addNewTest') &&
                  !currentPath.includes('practiceTestView') && (
                 <>
                    <div className="mb-3">
                      <CFormLabel htmlFor="explain" style={{fontWeight:'600'}}>Explain</CFormLabel>
                      <CFormTextarea
                        id="explain"
                        placeholder="Explain"
                        value={explain}
                        onChange={(e) => setExplain(e.target.value)}
                      ></CFormTextarea>
                    </div>
                               <div className="mb-3">
                               <CFormLabel htmlFor="exampleFormControlTextarea1" style={{fontWeight:'600'}}>Question Image</CFormLabel>
                               <CFormInput
                                 type="file"
                                 id="exampleFormControlInput1"
                                 placeholder="name of course"
                                 accept="image/*"
                                 onChange={handleExplainImageChange}
                               />
                               {explainPreview && (
                                 <img
                                   src={explainPreview}
                                   alt="explainPreview"
                                   style={{
                                     width: '300px',
                                     height: '300px',
                                     marginTop: '25px',
                                     borderRadius: '10%',
                                   }}
                                 />
                               )}
                             </div>
                 </>
                  )}
                  {
                  currentPath.includes('addNewTest') && (
                    <div className="mb-3">
                  
                  <CFormLabel htmlFor="question" style={{fontWeight:'600'}}>Timer of Test Per Time</CFormLabel>
                  <CFormTextarea
                    id="question"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></CFormTextarea>
                </div>
                  )}
     
                {/* <div>
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
                </div> */}
                <div className="d-flex gap-3">
                  <CFormCheck
                    id="calc?"
                    checked={calc}
                    onChange={() => setCalc((e) => !e)}
                  ></CFormCheck>
                  <CFormLabel htmlFor="calc?">Student can use calculator?</CFormLabel>
                </div>
                {!currentPath.includes('addNewTest') &&
                  !currentPath.includes('practiceTestView') && (
                    <div className="d-flex gap-3">
                      <CFormCheck
                        id="free?"
                        checked={free}
                        onChange={() => setFree((e) => !e)}
                      ></CFormCheck>
                      <CFormLabel htmlFor="free?">Is question for free ?</CFormLabel>
                    </div>
                  )}
              </div>
              <div className="col-auto text-center">
                <CButton
                  color="primary"
                  type="submit"
                  className="mb-3 w-25"
                  onClick={handleSubmit}
                  disabled={isCreateQuestion}
                >
                  {isCreateQuestion ? 'Loading...' : 'Add Question'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddQuestion
