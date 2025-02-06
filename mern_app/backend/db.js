const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://harshalpetkar07:petkar321@cluster0.icwov.mongodb.net/FOODDSPOT?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true }, // Fixed `useNewUrlParsel` typo
    (err) => {
      if (err) {
        console.log("MongoDB Connection Error:", err);
      } else {
        console.log("Connected Successfully");

        const fetched_data = mongoose.connection.db.collection("foodData");
        fetched_data.find({}).toArray(async function (err, data) {
          if (err) {
            console.log("Error fetching foodData:", err);
          } else {
            const food_category = await mongoose.connection.db.collection("foodCategory");
            food_category.find({}).toArray(function (err, catData) {
              if (err) {
                console.log("Error fetching foodCategory:", err);
              } else {
                global.foodData = data || []; // Ensure it's an array
                global.foodCategory = catData || [];
                console.log("Data Loaded Successfully");
              }
            });
          }
        });
      }
    }
  );
};

module.exports = mongoDB;
