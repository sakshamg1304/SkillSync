import mongoose, { Mongoose } from "mongoose"

const adminSchema = new mongoose.Schema({
     name: String, 
     password : String
    });

const userSchema = new mongoose.Schema({
    name: String,
    password : String,
    purchasedCourses : [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const courseSchema = new mongoose.Schema ({
    title: String,
    desc : String,
    published : Boolean,
    imageLink : String,
    price: Number
});
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('course', courseSchema);

module.exports = {
    Admin,
    User, 
    Course
};