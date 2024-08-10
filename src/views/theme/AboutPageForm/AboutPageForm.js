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

function AboutPageForm() {
  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const [fullPage, setFullPage] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const page = {
      ...fullPage,
      about: content,
    }

    setIsSubmited(true)
    const token = localStorage.getItem('token')
    axios
      .put(
        `https://courses-website-q0gf.onrender.com/api/pages/66b74a640606c930e3954a59?id=66b74a640606c930e3954a59`,
        page,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {})
      .then((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsSubmited(false)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`https://courses-website-q0gf.onrender.com/api/pages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFullPage(response.data[0])
        setContent(response.data[0].about)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>About Page</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">Content of About Page</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput2"
                  placeholder="content of about page"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="col-auto text-center">
                  <CButton
                    color="primary"
                    type="submit"
                    className="mb-3 mt-3 w-25"
                    onClick={handleSubmit}
                    disabled={isSubmited}
                  >
                    {isSubmited ? 'Loading...' : 'Add Content'}
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

export default AboutPageForm
