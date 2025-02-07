const express = require("express");
const cors = require("cors");  // ✅ Import CORS middleware
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");

mongoDB();

// ✅ Use CORS middleware properly
app.use(cors({
  origin: "https://food-spt-app.vercel.app", // ✅ Corrected URL (NO TRAILING `/`)
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

app.post("/api/foodData", (req, res) => {
  try {
    if (!global.foodData || !global.foodCategory) {
      return res.status(500).json({ error: "Data not loaded from database" });
    }
    res.json([global.foodData, global.foodCategory]);
  } catch (error) {
    console.error("Error in foodData API:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
