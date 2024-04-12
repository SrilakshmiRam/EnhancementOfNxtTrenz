import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    isClickRemoveAll: false,
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const isProductexists = prevState.cartList.find(
        each => each.id === product.id,
      )
      if (isProductexists) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + product.quantity}
              : item,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, product],
      }
    })
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.filter(cartItem => cartItem.id !== id),
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (eachCart.id === id) {
          const updatedQuantity = eachCart.quantity + 1
          return {...eachCart, quantity: updatedQuantity}
        }
        return eachCart
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(each => each.id === id)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({
      isClickRemoveAll: true,
      cartList: [],
    })
  }

  render() {
    const {cartList, isClickRemoveAll} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          isClickRemoveAll,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
