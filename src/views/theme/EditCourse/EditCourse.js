import React, { useEffect, useState } from 'react'
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

function EditCourse() {
  const { courseID } = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isGetCourse, setIsGetCourse] = useState(false)

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

  const handleEditing = (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const editCourse = {
      ...course,
      name: name,
      image: preview,
      description: description,
    }

    setIsEditing(true)
    axios
      .put(`https://courses-website-q0gf.onrender.com/api/course`, editCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setData(response.data.content);
        // setLoading(false);

        console.log(response.data)
      })
      .catch((error) => {
        // setError(error);
        // setLoading(false);
        console.log(error)
      })
      .finally(() => {
        setIsEditing(false)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsGetCourse(true)
    axios
      .get(`https://courses-website-q0gf.onrender.com/api/course?courseId=${courseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const course = response.data
        setCourse(course)
        setName(course.name)
        setPreview(course.image)
        setDescription(course.description)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
      .finally(() => {
        setIsGetCourse(false)
      })
  }, [])

  if (isGetCourse) {
    return <div>Loading...</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Course</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">Name of Course</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="name of course"
                  defaultValue={name}
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
              <div className="col-auto text-center">
                <CButton
                  color="primary"
                  type="submit"
                  className="mb-3 w-25"
                  onClick={handleEditing}
                  disabled={isEditing}
                >
                  {isEditing ? 'Loading...' : 'Edit Course'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditCourse
