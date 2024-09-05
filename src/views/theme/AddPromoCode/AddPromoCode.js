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

function AddPromoCode() {
  const [discountValue, setDiscountValue] = useState(0)
  const [expired, setExpired] = useState(0)
  const [isCreateCode, setIsCreateCode] = useState(false)

  const handleSubmitCode = (e) => {
    e.preventDefault()
    setIsCreateCode(true)
    const token = localStorage.getItem('token')
    axios
      .post(
        `https://92.113.26.138:8080/api/promocode?discount=${discountValue}&expiryDateByMonth=${expired}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setDiscountValue(0)
        setExpired(0)
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsCreateCode(false)
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
                <CFormLabel htmlFor="discountValue">Discount Value</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  id="discountValue"
                  placeholder="Enter Discount Value"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="expired">Expired Duration (By Month)</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  max="12"
                  id="expired"
                  placeholder="Enter Expired Duration (By Month)"
                  value={expired}
                  onChange={(e) => setExpired(e.target.value)}
                />
              </div>
              <div className="col-auto text-center">
                <CButton
                  color="primary"
                  type="submit"
                  className="mb-3 w-25"
                  onClick={handleSubmitCode}
                  disabled={isCreateCode}
                >
                  {isCreateCode ? 'Loading...' : 'Add Code'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddPromoCode
