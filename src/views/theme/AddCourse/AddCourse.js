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
// import { DocsExample } from 'src/components'

function AddCourse() {
  const [name, setName] = useState()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')

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

  // const handleSubmitCourse = ()=>{

  // }
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
                <CFormLabel htmlFor="exampleFormControlInput1">Name of Course</CFormLabel>
                <CFormInput
                  type="name"
                  id="exampleFormControlInput1"
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
                  value={name}
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
                  onChange={(e) => setDescription(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="col-auto text-center">
                <CButton color="primary" type="submit" className="mb-3 w-25">
                  Add Course
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      {/* <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Course</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Set heights using <code>size</code> property like <code>size=&#34;lg&#34;</code> and{' '}
              <code>size=&#34;sm&#34;</code>.
            </p>
            <DocsExample href="forms/form-control#sizing">
              <CFormInput
                type="text"
                size="lg"
                placeholder="Large input"
                aria-label="lg input example"
              />
              <br />
              <CFormInput
                type="text"
                placeholder="Default input"
                aria-label="default input example"
              />
              <br />
              <CFormInput
                type="text"
                size="sm"
                placeholder="Small input"
                aria-label="sm input example"
              />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol> */}
    </CRow>
  )
}

export default AddCourse
