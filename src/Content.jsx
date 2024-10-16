import PolarAreaChart from './PolarAreaChart'
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
} from 'reactstrap';
import Select from 'react-select'

const content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  
  return(
    <>
      <Navbar className='bg-nav p-0'>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="./src/assets/logo.svg"
            style={{
              height: 100,
              width: 150
            }}
          />
        </NavbarBrand>
        <NavbarBrand href="/" className='text-center'>
          Roda da vida da Nutrição
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          </Nav>
        </Collapse>
      </Navbar>

      <Container fluid>
        <Row className='justify-content-center pt-1'>
          <Col lg='12'>
              <Card className='p-2'>
                <Row>
                  <Col>
                    <Select options={options} />  
                  </Col>
                  <Col>
                    <Button>
                      Salvar
                    </Button> 
                  </Col>
                </Row>
              </Card>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col lg="6" md='12' sm="12">
            <Card>
              <PolarAreaChart/>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default content;