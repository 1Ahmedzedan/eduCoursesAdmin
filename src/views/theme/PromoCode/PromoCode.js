import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function PromoCode() {
  const [data, setData] = useState()

  const [isloading, setIsLoading] = useState(true)

  useEffect(function () {
    const token = localStorage.getItem('token')
    axios
      .get(`https://92.113.26.138:8080/api/promocodes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          id: item.id,
          code: item.code,
          discountValue: item.discount,
          createAt: item.createdDate,
          expired: item.expiryDateByMonth,
        }))
        setData(transformedData)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const navigate = useNavigate()

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'code', headerName: 'Code', width: 150 },
    { field: 'discountValue', headerName: 'Discount Value', width: 150 },
    { field: 'createAt', headerName: 'Create At', width: 150 },
    { field: 'expired', headerName: 'Duration Per Month', width: 150 },
  ]

  if (isloading) return <div>Loading...</div>

  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <button
          className="bg-success border-0 btn px-4 py-2 text-white fw-bold"
          onClick={() => navigate(`/addPromoCode`)}
        >
          Add Code
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

export default PromoCode
