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

function ContactPageForm() {
  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [fullPage, setFullPage] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const page = {
      ...fullPage,
      contact: {
        phone: phone,
        email: email,
      },
    }

    setIsSubmited(true)
    const token = localStorage.getItem('token')
    axios
      .put(
        `http://92.113.26.138:8080/api/pages/66bb64360c9ba27f7be93739?id=66bb64360c9ba27f7be93739`,
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
      .get(`http://92.113.26.138:8080/api/pages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFullPage(response.data[0])
        setPhone(response.data[0].contact.phone)
        setEmail(response.data[0].contact.email)
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
            <strong>Contact Page</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput2">Phone</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput2"
                    placeholder="Enter Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="exampleFormControlInput2">Email</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput2"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
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

export default ContactPageForm
