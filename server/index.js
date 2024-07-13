import app from "./app.js";
const PORT = 4000;

app.listen(PORT, (req, res) => {
  console.log(`IRONMAN server is running at the http://localhost:${PORT}`);
});
