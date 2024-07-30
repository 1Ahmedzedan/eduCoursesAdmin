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
import { DocsExample } from 'src/components'
import toast from 'react-hot-toast'
import axios from 'axios'

function AddPackage() {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState()
  const [priceEG, setPriceEG] = useState()
  const [priceDollar, setPriceDollar] = useState()
  const [description, setDescription] = useState([])
  const [preview, setPreview] = useState('')

  const handleAdding = (e) => {
    e.preventDefault()
    if (!name || !duration || !priceDollar || !priceEG || !description) {
      console.log('fdsflsdkf')
      toast('Here is your toast.')
    } else {
      const token = localStorage.getItem('token')
      const packages = {
        name: name,
        durationByMonths: duration,
        priceForNonEgypt: priceDollar,
        priceForEgypt: priceEG,
        description: description,
      }
      axios
        .post('https://courses-website-q0gf.onrender.com/package', packages, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // setData(response.data.content);
          // setLoading(false);

          console.log(response.data)
          toast('Added Succissfully')
        })
        .catch((error) => {
          // setError(error);
          // setLoading(false);
          console.log(error)
        })
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Package</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name of packages</CFormLabel>
                <CFormInput
                  type="name"
                  id="exampleFormControlInput1"
                  placeholder="name of package"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Duration By Months</CFormLabel>
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  placeholder="Duration By Months"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Price per Dollar</CFormLabel>
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  placeholder="Price per Dollar"
                  value={priceDollar}
                  onChange={(e) => setPriceDollar(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Price per EG</CFormLabel>
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  placeholder="Price per EG"
                  value={priceEG}
                  onChange={(e) => setPriceEG(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Description"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  onBlur={() => {
                    setDescription([...description, preview])
                    setPreview('')
                  }}
                />
              </div>
              <div className="mb-3">
                <p>page Description:</p>
                <ol>
                  {description?.map((item, idx) => {
                    return <li key={idx}>{item}</li>
                  })}
                </ol>
              </div>
              <div className="col-auto text-center">
                <CButton color="primary" type="submit" className="mb-3 w-25" onClick={handleAdding}>
                  Add Package
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddPackage
