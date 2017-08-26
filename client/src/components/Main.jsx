import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewListings from './NewListings.jsx';
import JoinedListings from './JoinedListings.jsx';
import InitiatedListings from './InitiatedListings.jsx';
import Explore from './Explore.jsx';
import Testimonials from './Testimonials.jsx';
import UserListings from './UserListings.jsx';
import ListingPage from './ListingPage.jsx';

var Main = (props) => (
	<div id='routes'>
	    <Switch>
	      <Route exact path='/userlistings' render={(oldProps) => (
	      	<UserListings
	      		{...oldProps}
	      		userId={props.userId}
	      		socket={props.socket} />
	      )}/>
    		<Route path='/userlistings/:id' render={(oldProps) => (
    			<ListingPage
    				{...oldProps}
    				userId={props.userId}
    				username={props.username}
    				socket={props.socket} />
    		)} />
	      <Route exact path="/" render={(oldProps) => (
	        <Explore
	        {...oldProps}
	        userId={props.userId}
	        socket={props.socket}/>
	      )}/>
	      <Route exact path="/new" render={(oldProps) => (
	        <NewListings
	        {...oldProps}
	        userId={props.userId}
	        socket={props.socket}/>
	      )}/>
	      <Route exact path="/joined" render={(oldProps) => (
	        <JoinedListings
	        {...oldProps}
	        userId={props.userId}
	        socket={props.socket}/>
	      )}/>
	      <Route exact path="/initiated" render={(oldProps) => (
	        <InitiatedListings
	        {...oldProps}
	        userId={props.userId}
	        socket={props.socket}/>
	      )}/>
				<Route exact path="/testimonials" render={(oldProps) => (
					<Testimonials
						{...oldProps}
						userId={props.userId}
						socket={props.socket}/>
				)}/>
	    </Switch>
	</div>
);

export default Main;
