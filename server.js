import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import cors from 'cors';


// App config
const app = express();
const port=80;
const connctionUrl="mongodb+srv://admin:nShwre4lYZfY0xb5@cluster0.yox00.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// middlewaes
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connctionUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/',(req,res)=>{
    res.status(200).send("Hello world");
})

app.post('/tinder/card',(req,res)=>{
    const dbCard = req.body; 

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/card',(req,res)=>{

    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port,()=>{
    console.log(`listening on localhost:${port}`);
})