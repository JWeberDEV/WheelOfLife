import PolarAreaChart from "./PolarAreaChart";
import React, { useState, useEffect } from "react";
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
  Input,
} from "reactstrap";
import Select from "react-select";
import chroma from "chroma-js";
import { colourOptions } from "/docs/data";

const content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [options, setOptions] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [value, setValue] = useState([
    {
      index: 1,
      color: "",
      value: 0,
    },
    {
      index: 2,
      color: "",
      value: 0,
    },
    {
      index: 3,
      color: "",
      value: 0,
    },
    {
      index: 4,
      color: "",
      value: 0,
    },
    {
      index: 5,
      color: "",
      value: 0,
    },
    {
      index: 6,
      color: "",
      value: 0,
    },
    {
      index: 7,
      color: "",
      value: 0,
    },
    {
      index: 8,
      color: "",
      value: 0,
    },
    {
      index: 9,
      color: "",
      value: 0,
    },
    {
      index: 10,
      color: "",
      value: 0,
    },
    {
      index: 11,
      color: "",
      value: 0,
    },
  ]);

  useEffect(() => {
    setOptions([
      { value: "1", label: "Alimentação" },
      { value: "2", label: "Relação com a comida" },
      { value: "3", label: "Vida social" },
      { value: "4", label: "Disposição" },
      { value: "5", label: "Sono" },
      { value: "6", label: "Relações pessoais" },
      { value: "7", label: "Relação com o corpo" },
      { value: "8", label: "Trabalho" },
      { value: "9", label: "Lazer" },
      { value: "10", label: "Autocuidado" },
      { value: "11", label: "Autocontrole" },
    ]);
  }, []);

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
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
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const handleSubmit = () => {
    if (selectedArea && selectedColor && inputValue) {
      handleUpdate(
        selectedArea.value,
        selectedColor.value,
        parseInt(inputValue)
      );
    }
  };

  const handleUpdate = (index, newColor, newValue) => {
    setValue((prevState) =>
      prevState.map((item) =>
        item.index == index
          ? { ...item, color: newColor, value: newValue }
          : item
      )
    );
  };

  return (
    <>
      <Navbar className="bg-nav p-0">
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="./src/assets/logo.svg"
            style={{
              height: 100,
              width: 150,
            }}
          />
        </NavbarBrand>
        <NavbarBrand href="/" className="text-center">
          Roda da vida da Nutrição
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar></Nav>
        </Collapse>
      </Navbar>

      <Container fluid>
        <Row className="justify-content-center pt-1 pb-1">
          <Col lg="12">
            <Card className="p-2 card-general">
              <Row>
                <Col lg="3">
                  <Select
                    options={options}
                    placeholder="Selecione um área"
                    onChange={setSelectedArea}
                  />
                </Col>
                <Col lg="3">
                  <Select
                    placeholder="Selecione uma cor"
                    options={colourOptions}
                    styles={colourStyles}
                    onChange={setSelectedColor}
                  />
                </Col>
                <Col lg="3">
                  <Input
                    type="number"
                    placeholder="Informe a nota de 0 a 10"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button onClick={handleSubmit}>Salvar</Button>
                </Col>
                <Col>
                  <Button>Exportar Roda da Vida</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="12" sm="12">
            <Card className="card-general">
              <PolarAreaChart value={value} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default content;
