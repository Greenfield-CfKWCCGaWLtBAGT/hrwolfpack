import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, InputGroup, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import $ from 'jquery';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      location: "",
      img_url: "",
      url: "",
      packSize: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.prePopulate) {
      this.setState({
        name: this.props.prePopulate.description,
        price: this.props.prePopulate.list_price,
        description: this.props.prePopulate.long_description,
        img_url: this.props.prePopulate.medium_image,
        url: this.props.prePopulate.url
      });
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    this.props.socket.emit('newListing', {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      location: this.state.location,
      initializer: this.props.userId
    });
    this.props.hideModal();
    this.props.history.push('/initiated');
  }

  render () {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Item Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="Price"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder = "Pickup Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="How many more wolves do you want in your pack?"
              name="packSize"
              value={this.state.packSize}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Link to Item"
              name="url"
              value={this.state.url}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Item Image URL"
              name="img_url"
              value={this.state.img_url}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Description for your Campaign"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              />
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Button bsStyle="success" onClick={this.onSubmit}>Create</Button>
      </form>
    );
  }
}

export default Form;

        // <DropdownButton
        //   componentClass={InputGroup.Button}
        //   id="input-dropdown-addon"
        //   title="Pack Size"
        //   >
        //   <MenuItem key="1">2</MenuItem>
        //   <MenuItem key="2">3</MenuItem>
        //   <MenuItem key="3">4</MenuItem>
        //   <MenuItem key="4">5</MenuItem>
        //   <MenuItem key="5">6</MenuItem>
        //   <MenuItem key="6">7</MenuItem>
        //   <MenuItem key="7">8</MenuItem>
        // </DropdownButton>