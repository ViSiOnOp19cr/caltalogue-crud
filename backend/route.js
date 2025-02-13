import { Model } from './db.js';
import express from 'express';
export const user = express.Router();

user.post('/post',(req,res)=>{
    const {title,author,publisher,numberofCopies,Price} = req.body;
    const newModel = new Model({
        title,
        author,
        publisher,
        numberofCopies,

    });
    newModel.save().then(()=>{
        res.json('Data added');
    }).catch((err)=>{
        console.log(err);
    })
});

user.get('/get',(req,res)=>{
    try{
        Model.find().then((data)=>{
            res.json(data);
        })
    }catch(err){
        console.log(err);
    }
})
user.delete('/delete/:id',(req,res)=>{
    
    const id = req.params.id;
    Model.findByIdAndDelete(id).then(()=>{
        res.json('Data deleted');
    }).catch((err)=>{
        console.log(err);
    })

}
)
user.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const {title,author,publisher,numberofCopies} = req.body;
    Model.findByIdAndUpdate({
        _id:id
    },{
        title,
        author,
        publisher,
        numberofCopies,

    }).then(()=>{
        res.json('Data updated');
    }).catch((err)=>{
        console.log(err);
    })
}
)
