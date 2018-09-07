const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/playground?authSource=admin',{
    user: 'mongoadmin',
    pass: '1234'    
    })  
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.err('could not connect',err));


    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: {type: Date, default: Date.now },
        isPublished: Boolean
    });

    const Course  = mongoose.model('Course', courseSchema );
    //-------------
    async function createCourse(){
        const course = new Course ({
            name: 'curso',
            author: 'davel',
            tags: ['node', 'backend'],
            isPublished:true
        });
        //save to data base
        const result = await course.save();
        console.log(result);
    }

    async function createCourse2(){
        //eq (equal)
        //ne (not equal)
        //gt (greater than)
        //gte (greater tahn or equal to)
        //lt (less than)
        //lte (less than or equal to)
        // in
        // nin  

        const course = new Course ({
            name: 'curso',
            author: 'davel',
            tags: ['node', 'backend'],
            isPublished:true
        });
        //save to data base
        const result = await course.save();
        console.log(result);
    }

    async function getCourses(){
        //or and 
        const courses = await Course
        //.find({author: 'Mosh', isPublished: true})
        .find()
            .or([{author: 'Mosh'},{ author: 'davel' }])
        .limit(10)
        .sort({name:1})
        .select({name:1, tags: 1, author:1});

        console.log(courses);
    }

    async function getCourses2(){
        //or and 
        const courses = await Course
         .find({ author: /el$/ })        
        .limit(10)
        .sort({name:1})
        .select({name:1, tags: 1, author:1});

        console.log(courses);
    }

    async function updateCourse(id){
        const course = await Course.findById(id);
        if (!course) return;

        course.isPublished = true;
        course.author = 'Another Author';

        const result = await course.save();
        console.log(result);
    }

    //getCourses2();
    //updateCourse('5b9284d6cbee9416048f1aba');
    
    

    async function removeCourse(id){
        const result = await Course.deleteOne({ _id: id });
        console.log(result);
    }

    removeCourse('5b9284d6cbee9416048f1aba');
    
