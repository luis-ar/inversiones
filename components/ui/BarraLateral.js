import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Barra = styled.div`
  background-color: black;
  z-index: 100;
  width: 30%;
  height: 100vh;
  position: fixed;
  margin-top: -10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: none;
  @media (min-width: 1000px) {
    width: 300px;
    display: block;
  }
`;
const Logo = styled.div`
  margin-bottom: 20px;
  .iconoEscritorio {
    width: 100%;
  }
  .iconoCelular {
    display: none;
  }
  @media (max-width: 800px) {
    .iconoEscritorio {
      display: none;
    }
    .iconoCelular {
      display: block;
      width: 30px;
      margin-right: 40px;
      margin-left: 5px;
    }
  }
`;
const ContenedorEnlaces = styled.div`
  color: white;
  font-size: 20px;
  .bx {
    font-size: 30px;
    margin-right: 5px;
  }
  div {
    display: flex;
    margin-bottom: 25px;
  }
`;
const BarraLateral = () => {
  return (
    <Barra>
      <Link
        href="/"
        onClick={() => {
          localStorage.clear();
        }}
      >
        <Logo>
          <img src="/static/img/logo.png" className="iconoCelular" />
          <img src="/static/img/future.png" className="iconoEscritorio" />
        </Logo>
      </Link>
      <ContenedorEnlaces>
        <div>
          <i class="bx bx-home"></i>
          <span>Inicio</span>
        </div>
        <div>
          <i class="bx bx-objects-vertical-bottom"></i>
          <span>Mis Inversiones</span>
        </div>
        <div>
          <i class="bx bx-checkbox-minus"></i> <span>Invertir</span>
        </div>
      </ContenedorEnlaces>
    </Barra>
  );
};

export default BarraLateral;
