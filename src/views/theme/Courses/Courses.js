import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Courses() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate()

  async function handleDelete(id) {
    if (isDeleting) return
    setIsDeleting(true)
    const token = localStorage.getItem('token')

    axios
      .delete(`https://courses-website-q0gf.onrender.com/api/course?courseId=${id}`, {
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
    axios
      .get('https://courses-website-q0gf.onrender.com/api/courses')
      .then((response) => {
        // setData(response.data.content);
        // setLoading(false);
        const transformedData = response.data.content.map((item) => ({
          ...item,
          lessonsPrefLength: item.lessonsPref.length, // Adjust this key to match your data
          finalQuizLength: 1, // Adjust this key to match your data
        }))
        setData(transformedData)
      })
      .catch((error) => {
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
    { field: 'id', headerName: 'ID', width: 141 },
    {
      field: 'image',
      headerName: 'Image',
      width: 141,
      renderCell: (params) => {
        return (
          <img
            src={params.row.image}
            alt="Item"
            style={{ width: '25%', height: 'auto', borderRadius: '50%' }}
          />
        )
      },
    },
    { field: 'name', headerName: 'Name', width: 75 },
    {
      field: 'lessonsPrefLength',
      headerName: 'Lessons',
      type: 'number',
      width: 130,
    },
    {
      field: 'createdDate',
      headerName: 'Date',
      width: 140,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 175,
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
            <p
              className="mb-0 me-3 text-success fw-bold"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/editCourse/${params.row.id}`)}
            >
              Edite
            </p>
            <p className="mb-0  fw-bold" style={{ cursor: 'pointer' }}>
              View
            </p>
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
          onClick={() => navigate('/addCourse')}
        >
          Add Course
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

export default Courses
