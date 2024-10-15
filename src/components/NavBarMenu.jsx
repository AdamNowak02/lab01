import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function NavBarMenu({ items }) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {items.map(item => (
                        <Nav.Link key={item.id} href={`/${item.label.toLowerCase()}`}>
                            {item.label}
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBarMenu;
