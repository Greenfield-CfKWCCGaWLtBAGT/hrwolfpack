import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserListings from './UserListings.jsx';
import ListingPage from './ListingPage.jsx';

export default const ListingRouter = () => (
  <Switch>
    <Route exact path='/userlistings' component={UserListings} />
    <Route path='/userlistings/:id' component={ListingPage} />
  </Switch>
)