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
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function AddChapter() {
  const { courseID } = useParams()
  const [name, setName] = useState('')
  const [isCreateLesson, setIsCreateLesson] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const chapter = {
      name: name,
      courseId: courseID,
    }

    setIsCreateLesson(true)
    const token = localStorage.getItem('token')
    axios
      .post(`https://courses-website-q0gf.onrender.com/api/chapter`, chapter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
            <strong>Add Chapter</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">Name of Chapter</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="name of chapter"
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
                    {isCreateLesson ? 'Loading...' : 'Add Chapter'}
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

export default AddChapter
