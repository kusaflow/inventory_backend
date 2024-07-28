const express = require('express');
const errorHandler = require('./middleware/ErrorHandle');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const Cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(Cors({
    origin: 'http://localhost:3000' 
  }));
app.options('*', Cors());

connectDB();
app.use(express.json());
app.use(errorHandler);

app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/properties", require("./routes/ProprtyRoutes"));
app.use("/api/admin", require("./routes/AdminRoutes"));
app.use("/api/bookings", require("./routes/BookingRouters"));
app.get("/", (req, res)=>{
  return res.send({server : "working"})
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
