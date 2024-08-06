import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router-dom'

function Pages() {
  const data = [
    {
      id: 1,
      PageName: 'About',
    },
    {
      id: 2,
      PageName: 'Terms',
    },
    {
      id: 3,
      PageName: 'Contact',
    },
  ]

  const navigate = useNavigate()

  const columns = [
    { field: 'PageName', headerName: 'Page Name', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <p
              className="mb-0 me-3 fw-bold"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/lessonQuestion/${courseID}/${params.row.id}`)}
            >
              Edit
            </p>
          </div>
        )
      },
    },
  ]

  return (
    <div>
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

export default Pages
