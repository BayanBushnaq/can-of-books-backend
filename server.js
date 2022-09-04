'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let mongoose = require('mongoose');

let storeDB = require('./DataBase')


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//Create schema 
const Bookschema = new mongoose.Schema ({
  title: String ,
  description: String ,
  status : Boolean 
})
const Book = mongoose.model('Book','Bookschema');

 // seedData 

 async function seedData(){
  const Book1 = new Book ({
      title : "The Secret ",
      description : " The Secret is a self-help book by Rhonda Byrne that explains how the law of attraction, which states that positive energy attracts positive things into your life, governs your thinking and actions, and how you can use the power of positive thinking to achieve anything you can imagine." ,
      status : true
  })

  const Book2 = new Book ({
      title : "LOLITA ",
      description : "a story structured as an autobiography written by Humbert Humbert during his time at the sanatorium and then in prison." ,
      status : false
  })

  const Book3 = new Book ({
      title : "Rich Dad Poor Dad ",
      description : "tells the story of a boy with two fathers, one rich, one poor, to help you develop the mindset and financial " ,
      status : true
  })
  Book1.save();
  Book2.save();
  Book3.save();
}

seedData();

app.get('/', homeRouteHandler)

function homeRouteHandler(req,res){
  res.send('Welcome to the home route') 
}

app.get('/books', booksRouteHandler)

function booksRouteHandler(req,res){
  Book.find({},(err,result)=>{
    if(err){
      console.log(err)
    } else {
      res.status(200).send(result)
    }
  })

}

app.get('/test', (request, response) => {

  response.send('test request received')

})



app.listen(PORT, () => console.log(`listening on ${PORT}`));
