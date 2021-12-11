const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const validator = require('validator')
const bodyParser = require('body-parser')
//const { format, parseISO } = require('date-fns')
const { connector } = require('./src/database')
const { decode } = require('./src/obfs')
const { randomkey } = require('./src/randomkey')
const {
  //{date:date} | {to:date, from:date}
  //result: {date: {$gte:fromDate, $lte:toDate}} | {date: date}
  criteriaDate,

  //_from => date | undefined
  //_to => date | undefined
  //{_from,_to}
  //result: {$gte:fromDate, $lte:toDate}
  toFromDate,

  //sort => {field:1|-1}, {field:'asc'|'desc'}, {field:'ascending'|'descending'}
  //limit => Number
  //skip => Number
  //{sort,limit,skip}
  queryOptions,

  //only use for multiple find and delete
  //"string"
  //result: /string/g
  regex,
  //incase sensitive
  //result: /string/gi
  regexi,
} = require('./src/model/mongtools')

const populateDB = async() => {
  Categories.collection.drop();
  Comments.collection.drop();
  Works.collection.drop();
  Blogs.collection.drop();
  Projects.collection.drop();
  const category = ['html5','css3','javascript','jquery','Google Cloud','ReactJS','NodeJs','AWS','firebase','express']
  const MAX = 6
  //Work
  const queryCategory = new Query(Categories);
  const queryWork = new Query(Works);
  //{title,desc,summary,url,thumb,lastupdate,created}
  for (let i=1;i<=Math.floor(MAX/3);i++) {
    let work;
    work = await queryWork.createsave({title:'google '+i,desc:'googlewebpage '+i,summary:'summary for google web '+i,thumb:'imagegoogle'+i+'.jpg',url:'https://www.google.com'})
      await queryCategory.createsave({wpid:work.id,context:'html5'})
      await queryCategory.createsave({wpid:work.id,context:'css3'})
      await queryCategory.createsave({wpid:work.id,context:'javascript'})
      await queryCategory.createsave({wpid:work.id,context:'jquery'})
      await queryCategory.createsave({wpid:work.id,context:'Google Cloud'})
    work = await queryWork.createsave({title:'youtube '+i,desc:'youtubewebpage '+i,summary:'summary for youtube web '+i,thumb:'imageyoutube'+i+'.jpg',url:'https://www.youtube.com'})
      await queryCategory.createsave({wpid:work.id,context:'html5'})
      await queryCategory.createsave({wpid:work.id,context:'css3'})
      await queryCategory.createsave({wpid:work.id,context:'javascript'})
      await queryCategory.createsave({wpid:work.id,context:'jquery'})
      await queryCategory.createsave({wpid:work.id,context:'Google Cloud'})
      await queryCategory.createsave({wpid:work.id,context:'firebase'})
    work = await queryWork.createsave({title:'facebook '+i,desc:'facebookwebpage '+i,summary:'summary for facebook web '+i,thumb:'imagefacebook'+i+'.jpg',url:'https://www.facebook.com'})
      await queryCategory.createsave({wpid:work.id,context:'html5'})
      await queryCategory.createsave({wpid:work.id,context:'css3'})
      await queryCategory.createsave({wpid:work.id,context:'javascript'})
      await queryCategory.createsave({wpid:work.id,context:'jquery'})
      await queryCategory.createsave({wpid:work.id,context:'ReactJs'})
      await queryCategory.createsave({wpid:work.id,context:'Redux'})
  }
  //Blog
  const queryBlog = new Query(Blogs);
  //{title,desc,summary,content,author,thumb,like,dislike,lastupdate,created}
  const newblog = [];
  for (let i=0;i<MAX;i++)  {
    newblog.push( await queryBlog.createsave({title:'sample blog '+i,desc:'description for blog '+i,summary:'summary for blog '+i,content:'content sample blog '+i,author:'brill',thumb:'image'+i+'.jpg'}) )
  }

  //console.log(newblog[0]);
  //Comment
  const queryComment = new Query(Comments);
  //{blog,name,email,message,lastupdate,created}
    for (let i = 0;i<MAX;i++) {
      //randomkey true is alphanum; false is withcharacters
      const user = 'User.'+randomkey(8,true).join('')
      await queryComment.createsave({blog:newblog[i].id,name:user,email:user+'@mail.com',message:'hi test from '+user+' for blog '+newblog[i].id})
    }

  //Project
  const queryProject = new Query(Projects);
  //{title,desc,summary,thumb,url,lastupdate,created}
  for (let i=0;i<MAX;i++) {
    const project = await queryProject.createsave({title:'sample project '+i,desc:'description for project '+i,summary:'summary for project '+i,thumb:'image'+i+'.jpg',url:'https://project'+i+'url.com'})
    const number = Math.floor(Math.random()*category.length)+3;
    for (let ind=0;ind<number;ind++) {
      const item = category[ Math.floor(Math.random()*category.length) ];
      const found = await queryCategory.findByCriteria({wpid:project.id,context:item})
      if (found.length===0) {
        await queryCategory.createsave({wpid:project.id,context:item})
      }else console.log('found:',project.id,'item:',item )
    }
  }
}

//a class with mongoose functionality to create, to query, and to remove
//need to pass a mongoose model
const { Query } = require('./src/model/generic')
//{title,desc,summary,content,author,thumb,like,dislike,lastupdate,created}
const { Blogs } = require('./src/model/blogs')
//{blog,name,email,message,lastupdate,created}
const { Comments } = require('./src/model/comments')
//{title,desc,url,thumb,lastupdate,created}
const { Works } = require('./src/model/works')
//{title,desc,summary,thumb,url,lastupdate,created}
const { Projects } = require('./src/model/projects')
//{wpid,context}
const { Categories } = require('./src/model/categories')

class Final extends Object{
  constructor(){
    super();
    this.result = undefined;
  }
}


//log all request
//request object, response object, next function
const posthandler = (req,res,next) => {
    //log the request
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    // you need to declare, coz your server will get stuck
    next();
}
//report result (callback)
const done = (error,result) => {
    console.log(result);
}
const doneresult = (error, result) => {
  return result;
}

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(posthandler);

const index = (req, res) => {
  res.sendFile(__dirname + '/src/views/dummy/index.html')
}


//fetchData
const fetchData = async (req,res) =>{
  //req.body:
  //
  // {serial:auth,type:encrypteddata}
  /* encrypteddata = 'type'
  */
  //body needs to have authentication
  //

  const serial = req.body.serial;
  let type = req.body.type;

  type = await decode(type,serial);
  switch (type) {
    case 'home':
      //use this to populate DB
      //await populateDB()

      //now create an api to get part of each db: works, project, blog

      res.json({ express: type });
      break;
    default:
      res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
      break;
  }

}
app.route('/api/page/latest').post(fetchData);
app.route('*').get(index).post(index);



const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
