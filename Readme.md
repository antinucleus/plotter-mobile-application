# Plotter Mobile Application

This application was developed with expo for the control of 2D plotter machine.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Contact](#contact)

## Introduction

There is no display on the machine for the control of the 2d plotter machine. All control of the machine is carried out with this mobile application. With this application, the machine can be tested in manual mode or the desired image can be selected and plotted after the necessary adjustments have been made.

You can access the `full documentation` from the link below.

Pen Plotter Link: [Pen Plotter](https://github.com/antinucleus/pen-plotter)

## Features

- Warning display to prevent the user from entering the distance exceeding the limit values of the machine

- When a movement command is given to the machine, do not prevent it from receiving a second command until it is completed

- Ability to control the machine in 5 different speed mode

- Ability to adjust the detail level of the vector image when converting selected raster images to a vector image

- Ability to adjust the smoothness values of curves to produce gcode

## Demo

<h4 align="center">
  Watch Demo Video on Youtube
</h4>

[![Watch the video](https://img.youtube.com/vi/F13d5m1M79A/0.jpg)](https://www.youtube.com/watch?v=F13d5m1M79A)

## Screenshots

<h4 align="center">
  Checking Connection
</h4>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/login-1.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/login-2.png" width="400"/>   
</div>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/login-3.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/home-1.png" width="400"/>   
</div>

<br/>
<br/>

<h4 align="center">
  Manual Mode
</h4>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/home-2.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/home-3.png" width="400"/>   
</div>

<br/>
<br/>

<h4 align="center">
  Image Selection
</h4>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-1.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-2.png" width="400"/>   
</div>

<br/>
<br/>

<h4 align="center">
  Vector Image Detail Level Adjusment
</h4>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-3.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-4.png" width="400"/>   
</div>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-5.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-6.png" width="400"/>   
</div>

<br/>
<br/>

<h4 align="center">
  Gcode Properties Adjusment
</h4>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-7.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-8.png" width="400"/>   
</div>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-9.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-10.png" width="400"/>   
</div>

<br/>
<br/>

<h4 align="center">
  Plotting Image
</h4>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/repo-medias/blob/main/plotter-mobile-application/plot-11.png" width="400"/>   
</div>

## Tech Stack

| Library                    | Category               | Version | Description                                                                                         |
| -------------------------- | ---------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| Expo                       | Mobile Framework       | v51     | A framework and platform for universal React applications                                           |
| React                      | UI Framework           | v18     | The most popular UI framework in the world                                                          |
| TypeScript                 | Language               | v5      | A typed superset of JavaScript that compiles to plain JavaScript                                    |
| React Navigation           | Navigation             | v6      | A routing and navigation library for React Native applications                                      |
| React Native Paper         | UI                     | v5      | A material design UI library for React Native applications                                          |
| React Native Toast Message | UI                     | v2      | A customizable toast message component for React Native applications                                |
| Expo Vector Icons          | UI                     | v14     | A library for easily adding vector icons to Expo and React Native applications                      |
| Expo Image                 | Media Handling         | v1      | An optimized image component for Expo and React Native applications                                 |
| Expo Image Manipulator     | Media Handling         | v12     | A library for manipulating images in Expo and React Native applications                             |
| Expo Image Picker          | Media Handling         | v15     | A library for selecting images and videos from the device's library or camera in Expo and RN        |
| Expo Network               | Networking             | v6      | A library for monitoring network state and connectivity in Expo and React Native applications       |
| Axios                      | Networking             | v1      | Promise based HTTP client for the browser and Node.js                                               |
| Zustand                    | State Management       | v4      | A small, fast, and scalable state management library                                                |
| Utility Types              | TypeScript Utility     | v3      | A set of predefined TypeScript types that provide utility functions for common type transformations |
| Husky                      | Git Hooks Management   | v9      | A tool that helps you manage Git hooks in your projects                                             |
| Lint Staged                | Pre-Commit Tool        | v15     | A tool that runs linters on your staged Git files                                                   |
| Eslint                     | Linting & Code Quality | v8      | A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript    |
| Flipper                    | Debugger               |         | An extensible mobile app debugging tool                                                             |
| Hermes                     | JS engine              |         | JavaScript engine optimized for running React Native applications                                   |

## Contact

Ömer Faruk Bağcı - [omerfarukbagci@antinucleus.dev](mailto:omerfarukbagci@antinucleus.dev)
