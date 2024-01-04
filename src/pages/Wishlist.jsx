import React from 'react'
import { Col, Row ,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { addToWishlist, removeFromWishlist } from '../Redux/Slices/wishlistSlice'
function Wishlist() {
  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
  const dispatch = useDispatch()
  return (
    <div style={{marginTop:'60px'}}>
      <Row  className='container mt-5'>
       { wishlist?.length>0?wishlist.map(product=>(
        <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
        <Card classNameshadow rounded style={{ width: '18rem' }}>
          <Link to={'/view/${product.id}'}><Card.Img style={{height:'180px'}} variant="top" src={product.thumbnail} /></Link>
          <Card.Body>
            <Card.Title>{product.title.slice(0,20)}...</Card.Title>
            <div className='d-flex justify-content-between'>
              <Button  onClick={()=>dispatch(removeFromWishlist(product.id))}  className='btn btn-light fs-5'><i className="fa-solid fa-heart-circle-minus text-danger"></i></Button>
              <Button className='btn btn-light fs-5'><i className="fa-solid fa-cart-plus text-success"></i></Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
       )): <div className="text-center">
        <img width={'50%'} height={'300px'} src="https://limasy.com/img/empty-animation1.gif" alt="" />
        <h4>Your Cart Is Empty!!</h4>
       </div>
       }
      </Row>
    </div>
  )
}

export default Wishlist
