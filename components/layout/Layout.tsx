import React, { ReactNode } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { redirect } from 'next/dist/server/api-utils';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Surveys App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/surveys/create">Create New Survey</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-secondary" onClick={()=>signOut({ callbackUrl: "/", redirect: true})}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container my-5">
        {children}
      </div>
    </>
  );
};

export default Layout;
