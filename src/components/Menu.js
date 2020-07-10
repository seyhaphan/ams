import React, { Component } from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../logo/logo.png'
import { strings } from '../react-localizationp-string/LocalizedString'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeLanguage } from '../redux/actions/articles/articleAction'
class Menu extends Component {

    handleChange = e => {
        const lang = e.target.title;
        localStorage.setItem("lang", lang)

        this.props.changeLanguage(lang)

        strings.setLanguage(lang)
        this.setState({})
    }

    render() {
        return (
            <Navbar expand={"lg"} className="bg-light" >
                <div className="container">
                    <Navbar.Brand as={Link} to="/">
                        <img className="mr-2" width="50" src={logo} alt="logo" />
                        {strings.ARTICLE_MANAGEMENT}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to={"/"}>{strings.ARTICLE}</Nav.Link>
                            <Nav.Link as={Link} to={'/Category'}>{strings.CATEGORY}</Nav.Link>
                            <NavDropdown
                                title={strings.LANGUAGE}
                                id="basic-nav-dropdown">

                                <NavDropdown.Item
                                    title="kh"
                                    onClick={(e) => this.handleChange(e)}>
                                    {strings.KHMER}
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    title="en"
                                    onClick={(e) => this.handleChange(e)}>
                                    {strings.ENGLISH}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        changeLanguage
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(Menu)