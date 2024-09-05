import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import { DocsExample } from 'src/components'

function AddLesson() {
  const { courseID, chapterID } = useParams()
  const [name, setName] = useState('')
  const [isCreateLesson, setIsCreateLesson] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const lesson = {
      name: name,
      courseId: courseID,
    }

    setIsCreateLesson(true)
    const token = localStorage.getItem('token')
    axios
      .post(
        `https://92.113.26.138:8080/api/lesson?courseId=${courseID}&chapterId=${chapterID}`,
        lesson,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setName('')
      })
      .then((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsCreateLesson(false)
      })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Lesson</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">Name of Lesson</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="name of lesson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="col-auto text-center">
                  <CButton
                    color="primary"
                    type="submit"
                    className="mb-3 mt-3 w-25"
                    onClick={handleSubmit}
                    disabled={isCreateLesson}
                  >
                    {isCreateLesson ? 'Loading...' : 'Add Lesson'}
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

export default AddLesson
