import express from "express";
import sequelize from "./config/database";
import User from "./models/user";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    await User.sync(); // Crea la tabla si no existe (solo para prueba)
    res.json({ message: "Backend y DB funcionando, modelo User OK" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;