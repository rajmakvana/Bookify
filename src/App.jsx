import React from 'react'
import {Routes , Route} from 'react-router-dom';
import Register from '../pages/Register';
import SignIn from '../pages/Login';
import Homepage from '../pages/Homepage';
import Home from '../components/Home';
import BookListingForm from '../pages/BookListingForm';
import ShowListing from '../pages/ShowListing';
import BookView from '../components/BookView';
import OrdersPage from '../pages/OrderPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} >
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-listing" element={<BookListingForm />} />
        <Route path='/show-listing' element={<ShowListing /> } />
        <Route path='/book/orders' element={<OrdersPage />} />
        <Route path='/book/view/:id' element={<BookView />} />
      </Route>  
    </Routes>
  )
}

export default App