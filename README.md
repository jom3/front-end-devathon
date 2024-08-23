# Slow Movie Cinema

## Descripción

Este proyecto fue realizado con angular version 18, con el propósito de simular un desarrollo organizado con la conformación de equipos aleatorios, esta es una aplicación web para un cine, este proyecto se basa como idea basándose en el contexto de la idea general de reserva de espacios para la Devathon de la séptima version.

## Índice

1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Deployment](#deployment)
7. [Contribución](#contribución)
8. [Licencia](#licencia)
9. [Autores y Reconocimientos](#autores-y-reconocimientos)
10. [Contactos y Soporte](#contactos-y-soporte)

## Instalación

Para su instalación se necesitan seguir los siguientes pasos:

### Requisitos Previos

Instalaciones necesarias:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [Angular](https://angular.dev/) (version 18.x o superior)
- [Git](https://git-scm.com/) (control de versiones)

### Clonación del repositorios:

Repositorio del backend

`git clone https://github.com/jom3/back-end-devathon.git`

Repositorio del frontend

`git clone https://github.com/jom3/front-end-devathon.git`

### Instalación de dependencias:

Una vez dentro del directorio del proyecto, instala las dependencias necesarias:

`npm install` o `npm i`


### Configuración del Entorno

Angular utiliza archivos de configuración de entorno que se encuentran en el directorio `src/environments`. Los archivos más comunes son:

- `environment.ts`: Utilizado para el entorno de desarrollo.
- `environment.prod.ts`: Utilizado para el entorno de producción.

Cada archivo de entorno define las variables específicas para ese entorno, como la URL de la API, claves secretas, etc.

#### Ejemplo de Archivo `environment.ts`

El archivo `src/environments/environment.ts` podría verse así:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // Otras variables de entorno para desarrollo
};
```

## Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
