const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const filepath = path.join(__dirname, "goodreads.db");

const app = express();

let db = null;

const intializedbandserver = async () => {
  try {
    db = await open({
      filename: filepath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is getting started");
    });
  } catch (e) {
    console.log(`error occured ${e.message}`);
    process.exit(1);
  }
};

intializedbandserver();

app.get("/books/", async (request, response) => {
  const dbquery = `SELECT * FROM book ORDER BY book_id`;

  const result = await db.all(dbquery);

  response.send(result);
});
