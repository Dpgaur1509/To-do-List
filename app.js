const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
//const date=require(__dirname + "/date.js");

const app=express();
//let items=[];
//let workItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://deepanshu2024csit1168:zjtQXc2hd5Do2lYi@cluster0.dok7s4i.mongodb.net/todolistDb",{useNewUrlParser:true});

const itemSchema ={
  name:String
}
const Item = mongoose.model("Item", itemSchema);

const Item1=new Item({
  name:"Welcome to TodoList"
});

const Item2=new Item({
  name:"<-click Here to add your daily work"
});
const Item3=new Item({
  name:"click Here To Delete"
});





app.get("/", async function (req, res) {
  try {
    const itemFound = await Item.find({});
    //itemFound.forEach((item) => {
      //console.log(item);
    //});
    if(itemFound.length===0){
        Item.insertMany([Item1,Item2,Item3])
        .then(()=>console.log("Sucess"))
        .catch((err)=>console.log(err));

        res.redirect("/")

    }
    else{
      res.render("list", { ListTitle: "Today", newListItem: itemFound });
    }
    
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});






app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item =new Item({
    name:itemName
  });

  item.save();

  res.redirect("/");

});

app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox ;
  Item.findByIdAndRemove(checkedItemId)
  .then(()=>res.redirect("/"))
  .catch((err)=>console.log(err));
  
})






app.post("/work",function(req,res){
  let item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(process.env.PORT || 3000,function() {
  console.log("server is running on port 3000");
})
