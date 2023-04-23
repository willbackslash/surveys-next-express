import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export const Header = () => {
    return(
        <div className="header">
            <h1>Surveys</h1>
            <DropdownButton
              as={ButtonGroup}
              drop="down"
              variant="secondary"
              title={`me@mail.com`}
            >
              <Dropdown.Item eventKey="1">Logout</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}