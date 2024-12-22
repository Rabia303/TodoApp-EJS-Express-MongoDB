const mongoose = require("mongoose");
const express = require("express");
const TodoApp = require('./models/todolist');
const app = express();
const port = 3001;

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Connect to MongoDB

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/todoapp");
}

app.post("/", (req, res) => {
  let { task } = req.body;
  let newItem = new TodoApp({
    TodoItem: task,
    created_at: new Date(),
  });

  newItem
    .save()
    .then(() => {
      console.log("Item added to the list");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/",async(req,res)=>{
  let items=await TodoApp.find();
  res.render('index.ejs',{items})
})


app.get('/tdlist/:id/edit',async(req,res)=>{
  let {id}=req.params;
  let items=await TodoApp.findById(id)
  res.render('edit.ejs',{items})
  
  })

app.put('/tdlist/:id',async(req,res)=>{
  let {id}=req.params
  let {task}=req.body;
  let updateitem=await TodoApp.findByIdAndUpdate(id,{TodoItem: task},{runValidators:true,new:true});
  console.log(updateitem);
  res.redirect('/')
  
})

app.delete('/tdlist/:id',async(req,res)=>{
  let {id}=req.params;
 let deleteitem=await TodoApp.findByIdAndDelete(id)
 console.log(deleteitem)
  res.redirect('/')
  
  })

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

