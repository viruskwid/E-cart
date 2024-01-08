import React, { useEffect , useState } from 'react'
import {Navbar,Container,Nav, Badge, Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productSearch } from '../Redux/Slices/productSlice';


function Header({insideHome}) {
  const [wishlistCount,setWishlistCount] = useState(0)
  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
  const [cartCount,setCartCount] = useState(0)
  const dispatch = useDispatch()
  const cart = useSelector(state=>state.cartReducer)
  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])
  return (
    <>
      <Navbar style={{height:'70px',backgroundColor:'white'}} className="top-0 w-100 mb-5 shadow-sm position-fixed  z-1">
        <Container className='mt-3'>
          <Navbar.Brand >
          <Link className='mt-5' to={'/'} style={{textDecoration:'none',color:'black'}}>
            <h5 className='d-flex align-items-center' style={{height:'50px'}}>
             <h4> <i className="fa-solid fa-truck-fast me-1"></i>    </h4>           
              <h4> Eazy-Cart</h4>
            </h5>
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
         {insideHome&&<Nav.Link>
            <div className='mb-2 ms-5'>
            <input onChange={e=>dispatch(productSearch(e.target.value.toLowerCase()))} style={{width:'400px'}} type="text" className='form-control bg-white' placeholder='search products!' />
          </div>
         </Nav.Link>}
            <Nav style={{gap:'30px'}} className="ms-auto">
              <Nav.Link className='btn border rounded mb-2'>
               <Link to={'/wishlist'} className='d-flex align-items-center' style={{color:'black',textDecoration:'none',}}> 
                  <i className="fa-solid fa-heart text-danger me-1" ></i>WishList
                  <Badge className='ms-2 rounded' bg='light'>{wishlistCount}</Badge>
               </Link>
              </Nav.Link>
              <Nav.Link className='btn border rounded mb-2'>
                <Link to={'/cart'} className='d-flex align-items-center' style={{color:'black',textDecoration:'none'}}> 
                    <i class="fa-solid fa-cart-shopping text-success me-1"></i>Cart
                    <Badge className='ms-2 rounded' bg='light'>{cartCount}</Badge>
                </Link>
                
              </Nav.Link>
              <Nav.Link className='btn border rounded mb-2'>
                <Link to={'/cart'} className='d-flex align-items-center' style={{color:'black',textDecoration:'none'}}> 
                <i class="fa-solid fa-user me-1"></i>Log in
                   
                </Link>
                
              </Nav.Link>
              
            </Nav>
          </Navbar.Collapse> 
        </Container>
      </Navbar>
      


    </>
  )
}

export default Header