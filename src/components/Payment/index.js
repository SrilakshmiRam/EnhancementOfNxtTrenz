import {useContext, useState} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const Payment = () => {
  const {cartList} = useContext(CartContext)

  const [paymentOption, setPaymentMethod] = useState('')
  const [confirmOrder, setOrderConfirm] = useState(false)
  const onchangePaymentMethod = event => {
    setPaymentMethod(event.target.id)
  }

  const onClickConfirm = () => {
    setOrderConfirm(true)
  }

  const getTotalPrice = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  return (
    <div className="payment-container">
      {confirmOrder ? (
        <p className="order-msg">Your order has been placed successfully</p>
      ) : (
        <>
          <h1 className="payment-heading">Payment Methods</h1>
          <ul className="pament-options-list">
            {paymentOptionsList.map(eachOption => (
              <li className="payment-option" key={eachOption.id}>
                <input
                  type="radio"
                  name="radio"
                  id={eachOption.id}
                  disabled={eachOption.isDisabled}
                  onChange={onchangePaymentMethod}
                />
                <label
                  className={`${
                    eachOption.isDisabled ? 'disabledText' : 'payment-text'
                  }`}
                  htmlFor={eachOption.id}
                >
                  {eachOption.displayText}
                </label>
              </li>
            ))}
          </ul>
          <div>
            <p className="order-details">Order Details</p>
            <p className="items-number">Number Of Items: {cartList.length}</p>
            <p className="price-total">Total Price: {getTotalPrice()}</p>
          </div>
          <button
            type="button"
            className="button-confirm"
            disabled={paymentOption === ''}
            onClick={onClickConfirm}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
