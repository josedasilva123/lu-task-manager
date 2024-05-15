import { app } from "./app";

const port = 10000;

app.listen({ port: Number(port) }, () => {
    console.log(`API successfully started at port ${port}`);
})
