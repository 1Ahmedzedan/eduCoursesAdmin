import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handdleLogin=(e)=>{
    e.preventDefault();
    const user={
      email:email,
      password:password
    }
    axios.post('https://92.113.26.138:8080/api/signin',user)
    .then((response) => {
      // setData(response.data.content);
      // setLoading(false);
      localStorage.setItem('token', response.data.token);
      navigate(`/dashboard`);

    })
    .catch((error) => {
console.log(error);
    });
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} className='d-flex justify-content-center'>
            <CCardGroup className='w-75'>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="Email"
                       autoComplete="email"
                        value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
  
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className='text-center'>
                        <CButton color="primary" className="px-4 w-50"onClick={handdleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
          
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
