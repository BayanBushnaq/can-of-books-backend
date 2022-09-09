"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
let mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010;

mongoose.connect(
  "mongodb://BayanBushnaq:1234@ac-9ykgkyg-shard-00-00.9vebrc0.mongodb.net:27017,ac-9ykgkyg-shard-00-01.9vebrc0.mongodb.net:27017,ac-9ykgkyg-shard-00-02.9vebrc0.mongodb.net:27017/?ssl=true&replicaSet=atlas-14bpd6-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Create schema
const Bookschema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});
const Book = mongoose.model("Book", Bookschema);

// seedData

async function seedData() {
  const Book1 = new Book({
    title: "The Secret ",
    description:
      " The Secret is a self-help book by Rhonda Byrne that explains how the law of attraction, which states that positive energy attracts positive things into your life, governs your thinking and actions, and how you can use the power of positive thinking to achieve anything you can imagine.",
    status: "Life Changing ",
  });

  const Book2 = new Book({
    title: "LOLITA ",
    description:
      "a story structured as an autobiography written by Humbert Humbert during his time at the sanatorium and then in prison.",
    status: "Favorite Five",
  });

  const Book3 = new Book({
    title: "Rich Dad Poor Dad ",
    description:
      "tells the story of a boy with two fathers, one rich, one poor, to help you develop the mindset and financial ",
    status: "Recommended To Me",
  });
  await Book1.save();
  await Book2.save();
  await Book3.save();
}

//Just Once
// seedData();

app.get("/", homeRouteHandler);

function homeRouteHandler(req, res) {
  res.send("Welcome to the home route");
}

app.get("/books", booksRouteHandler);

function booksRouteHandler(req, res) {
  Book.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
}

http://localhost:3010/addBooks
app.post("/addBooks", addBooksHandler);
async function addBooksHandler(req, res) {
  await Book.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,

  });
  Book.find({},(err,result)=>{
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
}



// http://localhost:3010/deleteBook/id
app.delete('/deleteBook/:id',deleteCurrentBook);
function deleteCurrentBook(req,res){
  const Bookid = req.params.id;
  Book.deleteOne({_id:Bookid},(err,result)=>{
    Book.find({},(err,result)=>{
      if(err){
        console.log(err)
      }
      else {
        
        res.send(result)
        // console.log(Bookid)
        // console.log(result)
       
        
      }
    })
  })
}

app.get("/test", (request, response) => {
  response.send("test request received");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
