import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems, isClickRemoveAll} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onCickRemoveAllItems = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          {isClickRemoveAll ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all"
                    onClick={onCickRemoveAllItems}
                    data-testid="remove"
                  >
                    Remove All
                  </button>
                  <CartListView />
                  <div className="summary">
                    <CartSummary />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
