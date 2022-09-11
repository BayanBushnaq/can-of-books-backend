"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
let mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
const {response}=require("express");

const PORT = process.env.PORT || 3010;

mongoose.connect("mongodb://BayanBushnaq:1234@ac-9ykgkyg-shard-00-00.9vebrc0.mongodb.net:27017,ac-9ykgkyg-shard-00-01.9vebrc0.mongodb.net:27017,ac-9ykgkyg-shard-00-02.9vebrc0.mongodb.net:27017/?ssl=true&replicaSet=atlas-14bpd6-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// console.log(process.env.mongodb);
//Create schema
const bookschema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
});
const book = mongoose.model("books", bookschema);

// seedData

async function seedData() {
  const book1 = new book({
    title: "The Secret ",
    description:
      " The Secret is a self-help book by Rhonda Byrne that explains how the law of attraction, which states that positive energy attracts positive things into your life, governs your thinking and actions, and how you can use the power of positive thinking to achieve anything you can imagine.",
    status: "Life Changing "
  });

  const book2 = new book({
    title: "LOLITA ",
    description:
      "a story structured as an autobiography written by Humbert Humbert during his time at the sanatorium and then in prison.",
    status: "Favorite Five"
  });

  const book3 = new book({
    title: "Rich Dad Poor Dad ",
    description:
      "tells the story of a boy with two fathers, one rich, one poor, to help you develop the mindset and financial ",
    status: "Recommended To Me"
  });
  await book1.save();
  await book2.save();
  await book3.save();
}

//Just Once
// seedData();

app.get("/", homeRouteHandler);

function homeRouteHandler(req, res) {
  res.send("Welcome to the home route");
}

app.get("/books", booksRouteHandler);

function booksRouteHandler(req, res) {
  book.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
}

// http://localhost:3010/addbooks
app.post("/addbooks", addbooksHandler);
async function addbooksHandler(req, res) {
  await book.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status

  });
  book.find({},(err,result)=>{
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
}



// http://localhost:3010/deletebook/id
app.delete('/deletebook/:id',deleteCurrentbook);
function deleteCurrentbook(req,res){
  const bookid = req.params.id;
  book.deleteOne({_id:bookid},(err,result)=>{
    book.find({},(err,result)=>{
      if(err){
        console.log(err)
      }
      else {
        
        res.send(result)
        // console.log(bookid)
        // console.log(result)
       
        
      }
    })
  })
}



app.put('/updatebook/:id',uppdateHandler);
function uppdateHandler(req,res){
  const id = req.params.id;
  console.log(id);
  const {title,description,status}=req.body;
  book.findByIdAndUpdate(id,{title,description,status},(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      book.find({},(err,result)=>{
        if(err){
          console.log(err);
        }else {
          res.send(result);
        }
      })
      
    }
  })
  }



app.get("/test", (request, response) => {
  response.send("test request received");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
