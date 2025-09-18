import express from "express";
import cors from "cors";
import characterRoutes from "./routes/character.route.js";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

app.use("/characters", characterRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
