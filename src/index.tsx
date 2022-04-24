import React from "react";
import ReactDOM from "react-dom";
import { App } from './app'
import './style.scss'

ReactDOM.render(
  <App message="Hello World! Simple Counter App built on ESBuild + React + Typescript"/>,
  document.getElementById('root')  
);