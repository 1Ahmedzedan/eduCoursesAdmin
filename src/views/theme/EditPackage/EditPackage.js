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
  CRow,
} from '@coreui/react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function EditPackage() {
  const { pkgID } = useParams()
  const [isGetPkg, setIsGetPkg] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState()
  const [priceEG, setPriceEG] = useState()
  const [priceDollar, setPriceDollar] = useState()
  const [description, setDescription] = useState([])
  const [preview, setPreview] = useState('')

  function handleAddDescription() {
    if (preview === '') return
    setDescription((e) => [...e, preview])
    setPreview('')
  }

  function handleDeleteItemDescription(itemIdx) {
    let tmp = []
    description.map((item, idx) => (itemIdx !== idx ? (tmp = [...tmp, item]) : null))
    setDescription(tmp)
  }

  const handleEditing = (e) => {
    e.preventDefault()
    if (name === '' || duration === '' || priceDollar === '' || priceEG === '') {
      return
    } else {
      const token = localStorage.getItem('token')
      const packages = {
        name: name,
        durationByMonths: duration,
        priceForNonEgypt: priceDollar,
        priceForEgypt: priceEG,
        description: description,
      }
      setIsEditing(true)
      axios
        .put(`https://courses-website-q0gf.onrender.com/packages/${pkgID}`, packages, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {})
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setIsEditing(false)
        })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsGetPkg(true)
    axios
      .get(`https://courses-website-q0gf.onrender.com/packages/${pkgID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const pkg = response.data
        setName(pkg.name)
        setDuration(pkg.durationByMonths)
        setPriceEG(pkg.priceForEgypt)
        setPriceDollar(pkg.priceForNonEgypt)
        setDescription(pkg.description)
        setPreview('')
      })
      .catch((error) => {
        console.log(error.response.data)
      })
      .finally(() => {
        setIsGetPkg(false)
      })
  }, [isEditing])

  if (isGetPkg) {
    return <div>Loading...</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Package</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name of packages</CFormLabel>
                <CFormInput
                  type="name"
                  id="exampleFormControlInput1"
                  placeholder="name of course"
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
                <div className="d-flex justify-content-between ">
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Description"
                    value={preview}
                    onChange={(e) => {
                      setPreview(e.target.value)
                    }}
                    style={{ width: '70%' }}
                  />
                  <CButton
                    color="primary"
                    type="button"
                    className="mb-3 w-25"
                    onClick={handleAddDescription}
                    disabled={isEditing}
                    style={{ width: '20%' }}
                  >
                    Add
                  </CButton>
                </div>
              </div>
              {description.length !== 0 && (
                <div>
                  <p>Description List : </p>
                  <ol>
                    {description.map((item, idx) => (
                      <div className="d-flex gap-5" key={idx}>
                        <li>{item}</li>
                        <span
                          className="text-danger"
                          style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: '600',
                          }}
                          onClick={() => handleDeleteItemDescription(idx)}
                        >
                          Delete
                        </span>
                      </div>
                    ))}
                  </ol>
                </div>
              )}
              <div className="col-auto text-center">
                <CButton
                  color="primary"
                  type="submit"
                  className="mb-3 w-25"
                  onClick={handleEditing}
                  disabled={isEditing}
                >
                  {isEditing ? 'Loading ...' : 'Edit Package'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditPackage
