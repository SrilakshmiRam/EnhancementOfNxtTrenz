// Write your code here
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import Payment from '../Payment'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const noOfItmsInTheCart = cartList.length

      let sumOfCartItemsPrice = 0
      cartList.forEach(each => {
        sumOfCartItemsPrice += each.price * each.quantity
      })

      return (
        <div className="summary-container">
          <h1 className="total-amountof-cartItems">
            Order Total:
            <span className="amount"> Rs {sumOfCartItemsPrice}/-</span>
          </h1>
          <p className="cartItemNumber">{noOfItmsInTheCart} Items in cart</p>
          <Popup
            modal
            trigger={
              <button type="button" className="checkout-button">
                Checkout
              </button>
            }
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
