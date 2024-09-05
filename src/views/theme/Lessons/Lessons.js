import React, { useEffect, useState } from 'react'
import styles from './Lessons.module.css'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../../Modal/Modal'
import { base_url } from '../../../constant'

function Lessons() {
  const { courseID, chapterID } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [level, setLevel] = useState('easy')

  const navigate = useNavigate()

  async function handleDelete(id) {
    if (isDeleting) return
    setIsDeleting(true)
    const token = localStorage.getItem('token')

    axios
      .delete(`${base_url}/api/lesson?lessonId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data
      })
      .catch((error) => {
        console.log(error.response.data)
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`${base_url}/api/chapter/${chapterID}/lessons?chapterId=${chapterID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }))
        setData(transformedData)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isDeleting])
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 275,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <p
              className="mb-0 me-3 text-danger fw-bold"
              style={{ cursor: 'pointer' }}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </p>

            <Modal>
              <Modal.Open>
                <p
                  className="mb-0 me-3 fw-bold"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/lessonQuestion/${courseID}/${params.row.id}`)}
                >
                  View Quiz
                </p>
              </Modal.Open>
              <Modal.Window>
                <div className={styles.modal_container}>
                  <div className={styles.level_form}>
                    <p>Select Quiz Level :</p>
                    <div className={styles.level_input}>
                      <input
                        type="radio"
                        value="easy"
                        id="easy"
                        name="level"
                        checked={level === 'easy'}
                        onChange={(e) => setLevel(e.target.value)}
                      />
                      <label htmlFor="easy">Easy</label>
                    </div>
                    <div className={styles.level_input}>
                      <input
                        type="radio"
                        value="medium"
                        id="medium"
                        name="level"
                        checked={level === 'medium'}
                        onChange={(e) => setLevel(e.target.value)}
                      />
                      <label htmlFor="medium">Medium</label>
                    </div>
                    <div className={styles.level_input}>
                      <input
                        type="radio"
                        value="hard"
                        id="hard"
                        name="level"
                        checked={level === 'hard'}
                        onChange={(e) => setLevel(e.target.value)}
                      />
                      <label htmlFor="hard">Hard</label>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/lessonQuestion/${courseID}/${params.row.id}/${level}`)
                    }
                    className={`${styles.quiz_btn}`}
                  >
                    View Quiz
                  </button>
                </div>
              </Modal.Window>
            </Modal>

            {/* <p
              className="mb-0 me-3 fw-bold"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/lessonQuestion/${courseID}/${params.row.id}`)}
            >
              View
            </p> */}
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <button
          className="bg-success border-0 btn px-4 py-2 text-white fw-bold"
          onClick={() => navigate(`/addLesson/${courseID}/${chapterID}`)}
        >
          Add Lesson
        </button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default Lessons
