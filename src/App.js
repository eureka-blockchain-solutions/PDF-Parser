import React, { Component } from "react";
import styled from "styled-components";
import EurekaLogo from "./views/icons/EurekaLogo";
import { __THIRD } from "./helpers/colors";
import Icon from "./views/icons/Icon";
import PDFDropzone from "./components/PDFjs/PDFDropzone";
import PDFReader from "./components/PDFjs/PDFReader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RelativeContainer = styled.div`
  position: relative;
  margin-top: 30px;
`;

const Title = styled.h1`
  font-family: "Indie Flower", cursive;
  font-size: 38px;
  margin-right: 4px;
`;

const Absolute = styled.div`
  position: absolute;
  bottom: -30px;
  right: -50px;
  display: flex;
  align-items: center;
`;

const SubContainer = styled.div`
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      pdfs: null
    };
  }
  render() {
    return (
      <Container>
        <RelativeContainer>
          <EurekaLogo width={500} />
          <Absolute>
            <Title>PDF Parser</Title>
            <Icon icon={"uploadPDF"} width={38} height={38} color={__THIRD} />
          </Absolute>
        </RelativeContainer>
        <SubContainer>
          <PDFDropzone
            onFinish={item => {
              this.setState({ pdfs: [...item.contents] });
            }}
          />
          {this.state.pdfs ? <PDFReader pdfs={this.state.pdfs} /> : null}
        </SubContainer>
      </Container>
    );
  }
}

export default App;
