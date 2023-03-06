const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');

app.use(express.json());
app.use(cors());

const Todo=require('./models/Todo')
const dbConfig=require('./configs/db.config');
console.log(dbConfig.DB_URL)
mongoose.connect(dbConfig.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=>console.log('Connected to DB'))
    .catch(()=>console.error)



app.get('/todos',async (req,res)=>{
    const todos=await Todo.find();

    res.json(todos)
});


app.post('/todos/new',async(req,res)=>{
        const todo=new Todo({
            text:req.body.text            
        });

        todo.save();
        res.json(todo)
});


app.delete('/todo/delete/:id',async(req,res)=>{
    const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result);

})


app.put('/todos/complete/:id',async(req,res)=>{
    const todo=await Todo.findById(req.params.id);
    todo.complete= !todo.complete;
    todo.save();
    res.json(todo);
})
const PORT=process.env.PORT|| 5000;


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})