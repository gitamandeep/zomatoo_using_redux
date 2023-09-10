import React, { useState } from 'react'
import "./style.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardData from "./CardData"
import { addToCart } from './redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
const Home = () => {
  const [cardData,setCardData] = useState(CardData);
  const dispatch = useDispatch();


  // add to cart 
  const send = (e)=>{
    dispatch(addToCart(e))
    toast.success("item added in your cart")
  }
  return (
    <>
   <section className="item_section mt-4 container">
    <h2 className='px-4' style={{fontWeight:400}}> RESTURANT IN HOSHIARPUR</h2>
    <div className='row mt-2 d-flex justify-content-around align-items-centre'>
    {
      cardData.map((element, index)=>{
        return(
          <>
          <Card style={{width:"22rem",border:"none"}} className='hove mb-4 '>
    <Card.Img varient="top" className='cd' src={element.imgdata}/>
      <div className="card_body">
        <div className="upper_data d-flex justify-content-between align-items-center">
        <h4>{element.dish} </h4>
        <span>{element.rating}&nbsp;&#9733;</span>
        </div>
        <div className="lower_data d-flex justify-content-between">

        <h5>{element.address} </h5>
        <span>{element.price}</span>
        </div>
        <div className="extra"></div>

        <div className="last_data d-flex justify-content-between align-items-center">
        <img src={element.arrimg} className='limg' alt="photu"/>
        <Button style={{width:"150px", background:"#ff3054db",border:"none"}} variant='outline-light'
        onClick={()=>send(element)}
        >ADD TO CART</Button>
        <img src={element.delimg} className='laimg' alt="photu"/>
        </div>
      </div>
    </Card>
          </>
        )
      })
    }
    

    </div>
   </section>
    </>
    
   
  )
}

export default Home