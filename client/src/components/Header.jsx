import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var Header = (props) => (
	<div>
		<Navbar inverse collapseOnSelect fixedTop>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#">
						Hello, {props.currentUser}
					</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem>
						<Link to="/">Explore</Link>
					</NavItem>

					<NavItem>
						<Link to="/new">New Listings Near You</Link>
					</NavItem>

					<NavItem eventKey={2} href="#">
						<Link to="/joined">Listings You Joined</Link>
					</NavItem>

					<NavItem eventKey={2} href="#">
						<Link to="/initiated">Listings You Initiated</Link>
					</NavItem>

					<NavItem eventKey={2} href="#">
						<Link to="/userlistings">All Your Listings</Link>
					</NavItem>

					<NavItem>
						<Link to="/testimonials">Reviews</Link>
					</NavItem>

			</Nav>
			<Nav pullRight>
				<NavItem eventKey={1} href="#">
					<Link to="/logout">Log Out</Link>
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
