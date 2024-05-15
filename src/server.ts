import { app } from "./app";

const port = process.env.PORT || 3001;

app.listen({ host: "0.0.0.0", port: Number(port) }, () => {
    console.log(`API successfully started at port ${port}`);
})
