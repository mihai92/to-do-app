const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const userRoute=require("./Routes/User");
const todoRoute=require("./Routes/Todo");

app.use(userRoute);
app.use(todoRoute);



app.listen(5000, () => {
    console.log(`Server running on http://localhost:${5000}`);
});