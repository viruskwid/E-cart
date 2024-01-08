import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart , incQuantity, removeCart } from '../Redux/Slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'


function Cart() {
  const navigate = useNavigate()
  const cart = useSelector(state=>state.cartReducer)
  const [cartAmount,setCartAmount] = useState(0)
  const dispatch = useDispatch()
  useEffect(()=>{
    if (cart?.length>0) {
      setCartAmount(cart.map(product=>product.totalPrice).reduce((n1,n2)=>n1+n2))
    }else{
      setCartAmount(0)
    }
  },[cart])
  const handleCheckOut =()=>{
    alert("Your Order is successfully placed")
    dispatch(emptyCart())
    navigate('/')
  }
  return (
    <>
    <Header/>
      <div className='container mt-5'>
       {cart?.length>0? <div className="row mt-5">
          <div className="col-lg-8 mt-5">
          <Table className='shadow'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image </th>
                <th>Quantity</th>
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
                <td><div className='d-flex'>
                  <button onClick={()=>dispatch(decQuantity(product))} className='btn fw-bolder'>-</button>
                  <input style={{width:'45px',pointerEvents:'none', border:'none'}} type="text" className='form-control text-center' value={product.quantity} />
                  <button onClick={()=>dispatch(incQuantity(product))} className='btn fw-bolder'>+</button>
                  </div></td>
                <td>${product.totalPrice}</td>
                <td></td>
                <td><button onClick={()=>dispatch(removeCart(product.id))} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
              </tr>
              ))}
            </tbody>
          </Table>
          <div className='float-end'>
            <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
            <Link to={'/'} className='btn btn-success' >Shop  More</Link>
          </div>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="border rounded shadow p-4">
              <h5>Total Product: <span className='fw-bolder'>{cart?.length}</span></h5>
              <h3>Total Amount: <span className='fw-bolder text-danger'>$ {cartAmount}</span></h3>
              <hr />
              <div className="d-grid">
                <button onClick={handleCheckOut} className='btn btn-success'>CheckOut</button>
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
    </>
  )
}

export default Cart