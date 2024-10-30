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
import { useMediaQuery } from "react-responsive";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);
  const [options, setOptions] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isMinTablet = useMediaQuery({ minWidth: "768px", maxWidth: "1023px" });
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
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
      { value: "1", label: "Relação com a comida" },
      { value: "2", label: "Alimentação" },
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
    let input = parseInt(inputValue);

    if (inputValue > 10 || inputValue < 0 || !Number(inputValue)) {
      return alert(
        "A nota informadoa é inválida. Informe um valor entre 0 e 10"
      );
    }

    const isColorUsed = value.some((element) => {
      return (
        element.color === selectedColor.value &&
        element.index !== parseInt(selectedArea.value)
      );
    });

    if (isColorUsed) {
      return alert("A cor selecionada já foi utilizada");
    }

    if (selectedArea && selectedColor && inputValue) {
      handleUpdate(selectedArea.value, selectedColor.value, input);
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

  const exportPDF = () => {
    const chartElement = document.querySelector("#chart");

    if (isDesktop) {
      // Temporarily increase size for export
      chartElement.style.width = "950px"; // Adjust as necessary
      chartElement.style.height = "950px";
    }

    html2canvas(chartElement, { backgroundColor: null, scale: 2 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = canvas.width * 0.264583;
        const pdfHeight = canvas.height * 0.264583;

        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
          unit: "mm",
          format: [pdfWidth, pdfHeight],
        });

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Roda_da_vida.pdf");
        
        if (isDesktop) {
          // Restore original size
          chartElement.style.width = "";
          chartElement.style.height = "";
        }

      }
    );
  };

  let mobileClass = "";
  if (isMobile || isMinTablet) {
    mobileClass = "pt-1 pb-2";
  }

  return (
    <>
      <Navbar className="bg-nav p-0">
        {(isMobile || isMinTablet || isTablet) && (
          <>
            <Row className="justify-content-center">
              <img
                alt="logo"
                src="./assets/fulllogo.png"
                style={{
                  width: 230,
                }}
              />
              <NavbarBrand href="/" className="text-center">
                Roda da vida da Nutrição
              </NavbarBrand>
            </Row>
          </>
        )}
        {isDesktop && (
          <>
            <NavbarBrand href="/">
              <img
                alt="logo"
                src="./src/assets/fulllogo.png"
                style={{
                  width: 250,
                }}
              />
            </NavbarBrand>
            <NavbarBrand href="/" className="text-center">
              Roda da vida da Nutrição
            </NavbarBrand>
            <NavbarBrand href="/" className="text-center"></NavbarBrand>
          </>
        )}
        {/* <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar></Nav>
        </Collapse> */}
      </Navbar>

      <Container fluid>
        <Row className="justify-content-center pt-2 pb-2">
          <Col lg="12">
            <Card className="p-2 card-general">
              <Row>
                <Col lg="3" className={mobileClass}>
                  <Select
                    options={options}
                    placeholder="Selecione um área"
                    onChange={setSelectedArea}
                  />
                </Col>
                <Col lg="3" className={mobileClass}>
                  <Select
                    placeholder="Selecione uma cor"
                    options={colourOptions}
                    styles={colourStyles}
                    onChange={setSelectedColor}
                  />
                </Col>
                <Col lg="3" className={mobileClass}>
                  <Input
                    type="number"
                    placeholder="Informe a nota de 0 a 10"
                    value={inputValue}
                    min="0"
                    max="10"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Col>
                {(isMobile || isMinTablet) && (
                  <>
                    <Col>
                      <Button onClick={handleSubmit} className="me-1">
                        Salvar
                      </Button>
                      <Button onClick={exportPDF}>Exportar</Button>
                    </Col>
                  </>
                )}
                {isDesktop && (
                  <>
                    <Col>
                      <Button onClick={handleSubmit}>Salvar</Button>
                    </Col>
                    <Col>
                      <Button onClick={exportPDF}>Exportar</Button>
                    </Col>
                  </>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="12" sm="12">
            <Card id="chart" className="card-general">
              <PolarAreaChart value={value} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Content;
