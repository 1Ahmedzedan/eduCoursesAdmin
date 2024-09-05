import React, { useEffect, useState } from 'react'
import ProfileCourseCard from '../ProfileCourseCard/ProfileCourseCard'
import styles from './ProfileCourses.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../../../constant'

function ProfileCourses() {
  const navigate = useNavigate()
  const [userCourses, setUserCourses] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { userID } = useParams()
  useEffect(() => {
    axios
      .get(`${base_url}/api/courses/paid?userId=${userID}`)
      .then((response) => {
        setUserCourses(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <div>Loading ...</div>

  return (
    <div className={`${styles.profile_courses_container}`}>
      <div className={`${styles.header}`}>
        <p>User Courses</p>
      </div>
      {userCourses.length === 0 ? (
        <div className={`${styles.empty_list}`}>
          <p>User didn&apos;t join to any courses untill now !</p>
        </div>
      ) : (
        <div className={`${styles.courses_container}`}>
          <Container fluid>
            <Row>
              {userCourses?.map((course) => (
                <Col md={4} key={course.courseId}>
                  <ProfileCourseCard
                    courseName={course.courseName}
                    id={course.courseId}
                    img={course.courseImage}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  )
}
export default ProfileCourses
