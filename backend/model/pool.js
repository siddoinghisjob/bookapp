require("dotenv").config();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

module.exports = mongoose;
