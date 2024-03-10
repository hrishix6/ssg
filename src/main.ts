import express from "express";
import "dotenv/config";
import http from "http";
import path from "path";

const app = express();

app.use(async (_, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.options("*", (_, res) => {
    return res.status(200);
});

app.use(express.static(path.join(process.cwd(), "public")));

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

function ListenAsync(server: http.Server, port: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

        server.listen(port);

        server.once("error", (err) => {
            reject(err);
        });

        server.once("listening", () => {
            resolve(true);
        })

    });
}

const server = http.createServer(app);

ListenAsync(server, PORT)
    .then(() => {
        console.log('server started listning on port', PORT);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

