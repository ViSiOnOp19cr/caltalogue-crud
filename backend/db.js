import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const catalugueSchema = new Schema({
    title: String,
    author:String,
    publisher:String,
    numberofCopies:Number,
    Price:Number
});
export const Model  = mongoose.model('catalogue',catalugueSchema);