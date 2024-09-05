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
import { base_url } from '../../../constant'
// import { DocsExample } from 'src/components'

function AddCourse() {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [isCreateCourse, setIsCreateCourse] = useState(false)
  const [timer, setTimer] = useState(0)

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

  const handleSubmitCourse = (e) => {
    e.preventDefault()
    if (name === '' || preview === null || description === '') return
    const course = {
      name: name,
      image: preview,
      description: description,
      timer: timer,
    }

    setIsCreateCourse(true)
    const token = localStorage.getItem('token')
    axios
      .post(`${base_url}/api/course`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setName('')
        setImage(null)
        setPreview(null)
        setDescription('')
        setTimer(0)
      })
      .then((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsCreateCourse(false)
      })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Course</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">Name of Course</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="name of course"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="exampleFormControlInput1"
                  placeholder="name of course"
                  // value={image}
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
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="timer">Time by minutes for final exam</CFormLabel>
                <CFormInput
                  type="number"
                  id="timer"
                  min={0}
                  value={timer}
                  onChange={(e) => setTimer(e.target.value)}
                ></CFormInput>
              </div>
              <div className="col-auto text-center">
                <CButton
                  color="primary"
                  type="submit"
                  className="mb-3 w-25"
                  onClick={handleSubmitCourse}
                  disabled={isCreateCourse}
                >
                  {isCreateCourse ? 'Loading...' : 'Add Course'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddCourse
