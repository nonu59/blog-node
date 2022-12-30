const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result, constant, bindAll } = require('lodash');

const { render } = require('ejs');

const blogRoutes = require('./routes/blogRoutes');


const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://nonu:nonu123@blog-momo.ks1wi.mongodb.net/blog-momo?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewURLParser:true, useUnifiedTopology:true})
.then((result)=>    app.listen(3000)) //listen to local host
.catch((err) =>console.log(err));


//register view engine
app.set('view engine','ejs');
app.set('views','views');

//listen to local host
// app.listen(3000);

//middleware and static files

// app.use((req,res,next)=>{
//     console.log('New Request made');
//     console.log('host : ',req.hostname);
//     console.log('path : ',req.path);
//     console.log('method : ',req.method);
//     next(); //dont stop here go ahead in the file also
// });
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true})); //get us object from url
//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'new blog 2',
        snippet:'about my new blog',
        body : 'more about my new blog'
    });

    blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>console.log(err));
});


app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=> res.send(result))
    .catch((err)=>console.log(err));
    // Blog.findById(id);
})


 
//get requests
app.get('/',(req,res)=>{
    // const blogs = [
    //     {title:'Momo loves Yashiii',snippet:'skdfj lsdf ksjdfkls jf'},
    //     {title:'Yashiii loves Momo',snippet:'skdfj lsdf ksjdfkls jf'},
    //     {title:'Momo loves mini',snippet:'skdfj lsdf ksjdfkls jf'}
    // ]; 
    // res.render('index',{pagename:'Home',blogs});
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{pagename:'About'});
});


app.use(blogRoutes);

//redirects
app.get('/aboutus',(req,res)=>{
    res.redirect('/about');
});




//404 page
app.use((req,res)=>{
    res.status(404).render('404',{pagename:'404'});
});



