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

function TermsPageForm() {
  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const [fullPage, setFullPage] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const page = {
      ...fullPage,
      terms: content,
    }

    console.log(page)
    setIsSubmited(true)
    const token = localStorage.getItem('token')
    axios
      .put(
        `https://courses-website-q0gf.onrender.com/api/pages/66b2c11ef617384faf5c9cfb?id=66b2c11ef617384faf5c9cfb`,
        page,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response)
      })
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
        console.log(response.data[0])
        setFullPage(response.data[0])
        setContent(response.data[0].terms)
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
            <strong>Terms Page</strong>
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

export default TermsPageForm
