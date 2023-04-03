import db from "./index.js"
import app from "./routes/trip-routes.js";

console.log("");
console.log("Server is starting please wait...");

const PORT = process.env.PORT || 8999;

db.connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
