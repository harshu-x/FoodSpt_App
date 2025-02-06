const { MongoAPIError } = require("mongodb");
const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://harshalpetkar:petkar321@cluster0.ehpn2vf.mongodb.net/FOODSPOT?retryWrites=true&w=majority";
const mongoDB = async () =>
  await mongoose.connect(
    mongoURI,
    { useNewUrlParsel: true, useUnifiedTopology: true },
    (err, result) => {
      if (err) {
        console.log("...", err);
      } else {
        console.log("Connected Successfully");
        const fetched_data = mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function (err, data) {
          const food_category= await mongoose.connection.db.collection("food_category");
          food_category.find({}).toArray(function(err,catData){
               if(err)
               console.log(err);
               else{
                global.food_items=data;
                  global.food_category=catData;
               }
          })
          // if (err) console.log(err);
          // else{
          //   global.food_items=data;
          //   console.log(global.food_items)
          // }
        })
      }
    }
  );

module.exports = mongoDB;
