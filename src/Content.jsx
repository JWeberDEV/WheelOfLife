import PolarAreaChart from './PolarAreaChart'
import React, { useState, useEffect } from 'react';
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
  Input
} from 'reactstrap';
import Select from 'react-select'
import chroma from 'chroma-js';
import { colourOptions } from '/docs/data';

const content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [options, setOptions] = useState([]);
  const [aspect, setAspect] = useState([]);

  // data: [5, 8, 7, 6, 10, 10, 3, 7, 8, 10, 5],

  useEffect(() => {
    setOptions([
      { value: 'Alimentação', label: 'Alimentação' },
      { value: 'Relação com a comida', label: 'Relação com a comida' },
      { value: 'Vida social', label: 'Vida social' },
      { value: 'Disposição', label: 'Disposição' },
      { value: 'Sono', label: 'Sono' },
      { value: 'Relações pessoais', label: 'Relações pessoais' },
      { value: 'Relação com o corpo', label: 'Relação com o corpo' },
      { value: 'Trabalho', label: 'Trabalho' },
      { value: 'Lazer', label: 'Lazer' },
      { value: 'Autocuidado', label: 'Autocuidado' },
      { value: 'Autocontrole', label: 'Autocontrole' },
    ]);
  }, []);
  
  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };
  
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
        <Row className='justify-content-center pt-1 pb-1'>
          <Col lg='12'>
              <Card className='p-2 card-general'>
                <Row>
                  <Col lg='3'>
                    <Select options={options} placeholder='Selecione um área'/>  
                  </Col>
                  <Col lg='3'>
                    <Select
                      defaultValue={colourOptions[2]}
                      options={colourOptions}
                      styles={colourStyles}
                    />
                  </Col>
                  <Col lg='3'>
                    <Input placeholder='Informe a nota de 0 a 10'/>
                  </Col>
                  <Col>
                    <Button>
                      Salvar
                    </Button> 
                  </Col>
                  <Col>
                    <Button>
                      Exportar Roda da Vida
                    </Button> 
                  </Col>
                </Row>
              </Card>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col lg="6" md='12' sm="12">
            <Card className='card-general'>
              <PolarAreaChart/>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default content;