const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/movies?authSource=admin',{
    user: 'root',
    pass: '1234'    
    })  
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.err('could not connect',err));


    const courseSchema = new mongoose.Schema({
        name: 
            { 
                type: String, 
                required: true,
                minlength: 5,
                maxlength: 255                
                //match: /pattern/
            },
        category: {
            type: String,
            required: true,
            enum: ['web', 'mobile', 'network'],
            lowercase: true
        },
        author: String,
        tags: {
            type: Array,
            validate: {
                isAsync: true,                
                validator: function (v, callback) {
                    // do some async work
                    //simulate tiem response
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        callback(result);
                    }, 500);                   
                },
                message: 'A course should have at least one tag.'
            }
        },
        date: {type: Date, default: Date.now },
        isPublished: Boolean,
        price: {
            type: Number,
            required: function() { return this.isPublished; },
            min: 10,
            max: 200,
            get: v => Math.round(v),
            set: v => Math.round(v)
        }
    });

    const Course  = mongoose.model('Course', courseSchema );
    //-------------

    async function createCourse(){
        const course = new Course ({
            name: 'cursos',
            author: 'davel',
            category: 'WEB',
            tags: ['frontend'],
            isPublished:true,
            price: 15.8
        });        

        try{
            //save to data base
            const result = await course.save();
            console.log(result);
        }catch (ex) {
            console.log(ex.message);
        }
    }

    //createCourse();

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
            //name: 'curso',
            category: '-',
            author: 'davel',
            tags: ['node', 'backend'],
            isPublished:true,
            price: 15
        });
        //save to data base
        const result = await course.save();
        console.log(result);
    }

    async function getCourses(){
        //or and 
        const courses = await Course
        .find()
        //.find()
          //  .or([{author: 'Mosh'},{ author: 'davel' }])
        //.limit(10)
        .sort({name:1})
        .select({name:1, tags: 1, author:1, price:1});        

        console.log(courses);
    }

    getCourses();

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

    //removeCourse('5b9284d6cbee9416048f1aba');
    
