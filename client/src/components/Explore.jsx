import React from 'react';
import { FormGroup, FormControl, Button, Well, Jumbotron, Grid, Row, } from 'react-bootstrap';
import axios from 'axios';
import Deal from './Deal.jsx';
import Deals from './Deals.jsx';
import CampaignModal from './CampaignModal.jsx';

class Explore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			deals: [],
			lgShow: false,
			prePopulate: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.showModal = this.showModal.bind(this);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	handleSearch(e) {
    e.preventDefault();

		axios.post('/api', {
			query: this.state.value
		})
		.then(res => {
			console.log(res);
			this.setState({
				deals: res.data
			});
		})
		.catch(err => {
			console.log('error', err);
		});

	}

	handleSelect(dealInfo) {
		this.setState({
			prePopulate: dealInfo
		});
		this.showModal();
	}

	hideModal(e){
	this.setState({
	  lgShow: false
	});
	}

	showModal(e){
	// e.preventDefault();
	this.setState({
	  lgShow: true
	});
	}

	render() {

		let backgroundURL = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiS16jZgPbVAhXH5lQKHd0lC80QjRwIBw&url=https%3A%2F%2Fwww.pinterest.com%2Fexplore%2Fcool-backgrounds%2F&psig=AFQjCNEr41HxzrZIdQfUZzlqOKUjhtcwwA&ust=1503874895465623';
		var divStyle = {
		  marginTop:'150px',
		  marginLeft: '250px',
		  marginRight: '250px',
		  backgroundImage: "url(" + backgroundURL + ")",
		  borderColor: 'grey',
		  borderWidth: 0.5,
		  borderRadius: 4
		};


		return (
			<div style={divStyle}>
        <Jumbotron>
          <h1 style={{'textAlign': 'center'}}>Welcome to the Pack!</h1>
          <div>
	          <p style ={{'textAlign': 'center'}}>Search for deals near you.</p>
					</div>
          <div>
				    <form style={{'margin': '20px'}}onSubmit={this.handleSearch}>
					      <FormGroup>
						      <FormControl
    							type="text"
    							value={this.state.value}
    							placeholder="Search for deals around the web"
    							onChange={this.handleChange}
							    />
					      </FormGroup>
							<Button bsStyle="primary" block onClick={this.handleSearch}>Search</Button>
				    </form>
          </div>
				<CampaignModal
				userId={this.props.userId}
				lgShow={this.state.lgShow}
				socket={this.props.socket}
				hideModal={this.hideModal}
				prePopulate={this.state.prePopulate}
				history={this.props.history}
				/>
				<Deals dealInfos={this.state.deals} handleSelect={this.handleSelect}/>
        </Jumbotron>

			</div>
		);
	}
}

export default Explore;
