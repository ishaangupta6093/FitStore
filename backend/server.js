const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
====================================
🚀 FitStore Backend Started
🌐 http://localhost:${PORT}
====================================
`);
});