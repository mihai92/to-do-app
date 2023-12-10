const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const userRoute=require("./Routes/User");
const todoRoute=require("./Routes/Todo");
const groupRoute=require("./Routes/Group");
const notificationsRoute=require("./Routes/Notifications");

app.use(userRoute);
app.use(todoRoute);
app.use(groupRoute);
app.use(notificationsRoute);



app.listen(5000, () => {
    console.log(`Server running on http://localhost:${5000}`);
});

module.exports=app;