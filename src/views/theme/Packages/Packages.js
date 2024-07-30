import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Packages() {
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
      .delete(`https://courses-website-q0gf.onrender.com/packages/${id}`, {
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
      .get('https://courses-website-q0gf.onrender.com/packages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setData(response.data.content);
        // setLoading(false);

        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        // setError(error);
        // setLoading(false);
        console.log(error.response.data)
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
    // {
    //   field: 'image',
    //   headerName: 'Image',
    //   width: 141,
    //   renderCell: (params) => {
    //     return (
    //       <img src={params.row.image} alt="Item" style={{ width: '25%', height: 'auto', borderRadius: '50%' }} />
    //     )
    //   }
    // },
    { field: 'name', headerName: 'Name', width: 100 },
    {
      field: 'durationByMonths',
      headerName: 'Duration By Months',
      type: 'number',
      width: 180,
    },
    {
      field: 'priceForEgypt',
      headerName: 'Price per EG',
      type: 'number',
      width: 130,
    },
    {
      field: 'priceForNonEgypt',
      headerName: 'price Per Dollar',
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
              onClick={() => navigate(`/editPackage/${params.row.id}`)}
            >
              Edite
            </p>
          </div>
        )
      },
    },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]
  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <button
          className="bg-success border-0 btn px-4 py-2 text-white fw-bold"
          onClick={() => navigate('/addPackage')}
        >
          Add Packge
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

export default Packages
