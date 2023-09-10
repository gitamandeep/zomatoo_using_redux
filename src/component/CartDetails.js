import React, { useEffect, useState } from 'react'
import "./cartStyle.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeToCart,removeSingleItems,emptycartItem } from './redux/features/cartSlice';
import toast from 'react-hot-toast';
const CartDetails = () => {
  const {carts} = useSelector((state)=>state.allCart);
 
  const [totalPrice,setprice] = useState(0);
  const [totalItem,setTotalItem] = useState(0);

  const dispatch = useDispatch();
  const handleIncrement = (e) =>{
    dispatch(addToCart(e))
  }
  //remove from cart 
  const handleDecrement = (e)=>{
    dispatch(removeToCart(e))
    toast.success("your cart is empty")
  }
  // remove single dec
  const singleDecrement = (e)=>{
    dispatch(removeSingleItems(e))
    toast.success("item removed")
  }
  const clearCart = (e)=>{
    dispatch(emptycartItem(e))
    toast.success("your cart is empty")
  }
// now count total price
const total = ()=>{
  let totalPrice = 0;
  let totalItem = 0;
  carts.map((element,index)=>{
   totalPrice = (element.price*element.qnty) +totalPrice;
   totalItem = element.qnty + totalItem;
  });
  setprice(totalPrice);
  setTotalItem(totalItem);
}
useEffect(()=>{
  total()
},[total]);


  return ( 
    <>
  <div className="row justify-content-center m-0">
  <div className='col-md-8 mt-5 mb-5 cardsdetails'>
    <div className='card'>
      <div className="card-header bg-dark p-3">
       <div className='card-header-flex'>
       <h5 className='text-white'> CART CALCULATION{carts.length>0?`(${carts.length})`: ''}</h5>
        {
            carts.length>0?<button className='btn btn-danger mt-0 btn-sm'
            onClick={clearCart }
            ><i class="fa-solid fa-trash"></i> </button> :" "
        }
       </div>
      </div>
      <div className="card-body p-0">
        {
          carts.length ===0 ? <table className='table cart-table mb-0'>
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className='cart-empty'>
                  <i className='fa fa-shopping-cart'></i>
                  <p>YOUR CART IS EMPTY</p>
                </div>
              </td>
            </tr>
          </tbody>


          </table> : 
          <table className='table cart-table mb-0 table-responsive-sm'>
          <thead>
            <tr>
            <th> Action </th>
            <th> product</th>
            <th> name</th>
            <th>  price</th>
            <th>Qty</th>
            <th className='text-right'><span id='amount' className='amount'>Total Amount</span> </th>
            </tr>
          </thead>
            <tbody>
              {
                carts.map((data,index)=>{
                 return(
                    <>
                    <tr>
                      <td>
                        <button className='prdct-delete' 
                        onClick={()=>handleDecrement(data.id)}><i class="fa-solid fa-trash"></i></button>
                      </td>
                      <td><div className='product-img'><img src={data.imgdata}/></div></td>
                    <td> <div className='product-name'> <p>{data.dish}</p></div> </td>
                    <td>{data.price}</td>
                    <td>
                      <div className='prdct-qty-container'>
                      <button className='prdct-qty-btn' type='button'
                        onClick={()=>{
                         data.qnty===1?handleDecrement(data.id): singleDecrement(data);
                        }}    >
                      <i className='fa fa-minus'></i>
                     </button>
                     <input type='text' className='qty-input-box' value={data.qnty} disable name='' id='' />
                     <button className='prdct-qty-btn' type='button'
                      onClick={()=>handleIncrement(data)}>
                      <i className='fa fa-plus'></i>
                     </button>
                      </div>
                    </td>
                    <td className='text-right'>
                      {data.qnty * data.price}
                    </td>

                    </tr>

                    </>

                 )  
              })
              }
            </tbody>
              <tfoot>
                <tr>
                  <th> &nbsp;</th>
                  <th colSpan={3}> &nbsp;</th>
                  <th>ITEM IN CART <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalItem}</span></th>
                  <th className='text-right'>Total <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalPrice}</span></th>
                </tr>
              </tfoot>
          </table>
        }
      </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default CartDetails