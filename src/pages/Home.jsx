import React, { useEffect } from 'react'
import { Col, Row ,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { fetchProducts } from '../Redux/Slices/productSlice'
import { addToWishlist } from '../Redux/Slices/wishlistSlice';
import { addtoCart } from '../Redux/Slices/cartSlice';


function Home() {
  const dispatch = useDispatch()
  const {loading,products,error} = useSelector((state)=>state.productSlice)
  const {wishlist} = useSelector(state=>state.wishlistSlice)
  const cart = useSelector(state=>state.cartReducer)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  const handleWishlist = (product)=>{
    const exisitingProduct = wishlist.find(item=>item.id==product.id)
    if (exisitingProduct) {
      alert("Product already in the cart")
    }else{
      dispatch(addToWishlist(product))
    }
  }
  const handleCart = (product)=>{
    const existingProduct = cart.find(item=>item.id==product.id)
  }
  return (
    <div className='d-flex justify-content-center z-2' style={{marginTop:'60px'}}>
      {
        loading?<div className='d-flex justify-content-center mt-5'><Spinner animation="border" variant="secondary" /></div> : <Row  className='container mt-5'>
     {  
     products.length>0&&products.map((product,index)=>(
      <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
      <Card className='shadow rounded card ' style={{ width: '18rem' }}>
        <Link to={`/view/${product.id}`}><Card.Img style={{height:'180px'}} variant="top" src={product.thumbnail} /></Link>
        <Card.Body>
          <Card.Title>{product.title.slice(0,20)}..</Card.Title>
         <Card.Text>
          <h6>{`${product.price}₹`}</h6>
         </Card.Text>
          <div className='d-flex justify-content-between'>
            <Button onClick={()=>handleWishlist(product)}  className='btn btn-light fs-5'><i className="fa-solid fa-heart text-danger"></i></Button>
            <Button onClick={()=>dispatch(addtoCart(product))}  className='btn btn-light fs-5'><i className="fa-solid fa-cart-plus text-success"></i></Button>
          </div>
        </Card.Body>
      </Card> 
    </Col>
     ))
     }
      </Row>
      }
     
    </div>
  )
}

export default Home