import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'


function Cart() {
  const cart = useSelector(state=>state.cartReducer)
  return (
    <div className='container mt-5'>
     {cart?.length>0? <div className="row mt-5">
        <div className="col-lg-8 mt-5">
        <Table className='shadow'>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Image </th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((product,index)=>(
              <tr key={index} className='text-center'>
              <td>{index+1}</td>
              <td>{product.title}</td>
              <td><img style={{height:'100px',width:'100px'}} src={product.thumbnail} alt="product" /></td>
              <td>${product.price}</td>
              <td></td>
              <td><button className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
            </tr>
            ))}
          </tbody>
        </Table>
        </div>
        <div className="col-lg-4 mt-5">
          <div className="border rounded shadow p-4">
            <h5>Total Product: <span className='fw-bolder'>3</span></h5>
            <h3>Total Amount: <span className='fw-bolder text-danger'>$ 560</span></h3>
            <hr />
            <div className="d-grid">
              <button className='btn btn-success'>CheckOut</button>
            </div>
          </div>
        </div>
      </div> :
      <div className="text-center mt-4">
      <img width={'50%'} height={'300px'} src="https://limasy.com/img/empty-animation1.gif" alt="" />
      <h4>Your Cart Is Empty!!</h4>
     </div> 
      }

    </div>
  )
}

export default Cart