import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Router from "next/router";
import { FirebaseContext } from "@/firebase";
import {
  Formulario,
  Campo,
  InputSubmit,
  ErrorMostrar,
} from "../components/ui/Formulario";

import useValidacion from "../Hooks/useValidacion";
import validarCrearUsuarioBilletera from "@/Validacion/validarCrearUsuarioBilletera";
import Spinner from "@/components/ui/Spinner";
const STATE_INICIAL = {
  apellido: "",
  password: "",
  telefono: "",
};
const registroBilletera = () => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [error, guardarError] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState(STATE_INICIAL);
  const [pase, guardarPase] = useState(false);
  // useEffect(() => {
  //   if (usuario) {
  //     console.log("Datos del usuario:", usuario);
  //     setDatosUsuario({
  //       nombre: usuario.displayName || "",
  //       email: usuario.email || "",
  //       apellido: "",
  //       password: "",
  //       telefono: "",
  //     });
  //   }
  // }, [usuario]);

  const crearCuenta = async () => {
    const data = {
      names: usuario.displayName,
      lastname: apellido,
      email: usuario.email,
      password: password,
      phone: telefono,
    };

    console.log("Datos a enviar:", data);

    try {
      const response = await fetch(
        "https://billapp-5d53d479ff62.herokuapp.com/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta de la API:", responseData);
        guardarPase(true);
        setTimeout(() => {
          Router.push("/principalBilletera");
        }, 1000);
      } else {
        console.error(
          "Error al enviar los datos:",
          response.status,
          response.statusText
        );

        // Imprimir más detalles sobre la respuesta
        const responseBody = await response.json();
        console.log("Cuerpo de la respuesta:", responseBody);

        // Acceder al valor de la propiedad 'data'
        if (responseBody && responseBody.data) {
          console.log('Contenido de la propiedad "data":', responseBody.data);

          if (Array.isArray(responseBody.data)) {
            guardarError(responseBody.data[0]);
            setTimeout(() => {
              guardarError("");
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const { valores, errores, handleSumit, handleChange, handleBlur } =
    useValidacion(datosUsuario, validarCrearUsuarioBilletera, crearCuenta);

  const { apellido, telefono, password } = valores;

  return (
    <Layout>
      <div
        css={css`
          color: white;
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        {pase && <Spinner />}

        <h2
          css={css`
            text-align: center;
            margin-top: 15px;
          `}
        >
          Crea tu cuenta de Yape
        </h2>

        <Formulario onSubmit={handleSumit} noValidate>
          {errores.nombre && <ErrorMostrar>{errores.nombre}</ErrorMostrar>}

          <Campo>
            <label htmlFor="nombre">Nombre</label>

            {usuario && (
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu Nombre"
                value={usuario.displayName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}

            {/* <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
          </Campo>
          {errores.apellido && <ErrorMostrar>{errores.apellido}</ErrorMostrar>}

          <Campo>
            <label htmlFor="nombre">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Tu Apellido"
              value={apellido}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.email && <ErrorMostrar>{errores.email}</ErrorMostrar>}

          <Campo>
            <label htmlFor="nombre">Correo</label>

            {usuario && (
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Tu Correo"
                value={usuario.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
            {/* <input
              type="text"
              id="email"
              name="email"
              placeholder="Tu Correo"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
          </Campo>
          {errores.telefono && <ErrorMostrar>{errores.telefono}</ErrorMostrar>}

          <Campo>
            <label htmlFor="nombre">Telefono</label>
            <input
              type="text"
              id="telefono"
              maxlength="9"
              name="telefono"
              placeholder="Tu telefono"
              value={telefono}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.password && <ErrorMostrar>{errores.password}</ErrorMostrar>}

          <Campo>
            <label htmlFor="nombre">Contraseña</label>
            <input
              type="password"
              maxlength="6"
              id="password"
              name="password"
              placeholder="Tu Contraseña"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {error && <ErrorMostrar>{error}</ErrorMostrar>}

          <InputSubmit type="submit" value="Crear Cuenta" />
        </Formulario>
      </div>
    </Layout>
  );
};

export default registroBilletera;
