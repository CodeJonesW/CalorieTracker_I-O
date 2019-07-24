import React from "react";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";

class MyNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  clearLocal = () => {
    localStorage.clear()
  }


  render() {
    return (
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">Health Tracker I/O</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav className="mr-auto"navbar>
            <NavItem>
              <NavLink active href="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/activities">
                Activities
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/goals">
                Goals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/consumptions">
                Consumptions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" onClick={this.clearLocal}>
                Signout
              </NavLink>
            </NavItem>
            {/* <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle nav caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </Nav>

          <Nav navbar className="ml-auto">
            <InputGroup size="sm" seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  {/* <FontAwesomeIcon icon={faSearch} /> */}
                </InputGroupText>
              </InputGroupAddon>
              <FormInput className="border-0" placeholder="Search..." />
            </InputGroup>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
let mapStateToProps = (state) => {
  return { user: state.user.userInfo}
}

export default connect(mapStateToProps)(MyNavBar)