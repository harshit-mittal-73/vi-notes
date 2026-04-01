import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import connectToDB from "./src/config/database";

connectToDB();

const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});