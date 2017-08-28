import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var Header = (props) => (
	<div className="navbar">
		<Navbar inverse collapseOnSelect fixedTop>
			<Navbar.Header>
				<Navbar.Brand>
					<a id='user-name' href="#">
						Hello, {props.currentUser}
					</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem>
						<Link to="/">Create Listing</Link>
					</NavItem>

					<NavItem>
						<Link to="/new">New Listings Near Me</Link>
					</NavItem>
					<NavItem eventKey={2} href="#">
						<Link to="/userlistings">My Listings</Link>
					</NavItem>

					<NavItem>
						<Link to="/testimonials">Testimonials</Link>
					</NavItem>

			</Nav>
			<Nav pullRight>
				<NavItem eventKey={1} href="/logout">
					<form action='/logout' method="GET"><button type="submit">Logout</button></form>
				</NavItem>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
</div>
);

export default Header;
// <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
// 	<MenuItem eventKey={3.1}>Action</MenuItem>
// 	<MenuItem eventKey={3.2}>Another action</MenuItem>
// 	<MenuItem eventKey={3.3}>Something else here</MenuItem>
// 	<MenuItem divider />
// 	<MenuItem eventKey={3.3}>Separated link</MenuItem>
// </NavDropdown>
