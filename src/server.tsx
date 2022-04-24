import express from "express";
import React from "react";
import * as ReactDOMServer from 'react-dom/server';
import { App } from "./app";

console.log(ReactDOMServer.renderToString(<App message="hello world" />))

const app = express();

app.get('/', (req, res) => {
    // const app = 'hello world'
    const app = ReactDOMServer.renderToString(<App message="hello world" />);

    const html = `
        <html lang="en">
        <head>
          <title>hello world</title>
        </head>
        <body>
            <div id="root">${app}</div>
        </body>
        </html>
    `
    res.send(html);
});

app.use(express.static("./public"));

app.listen(4242);