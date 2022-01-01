//TODO:
//1. put all uniques as a label and checkbox
//2. default of checkbox is checked (all)
//2. if any of checkbox is deselected, update state 'filter'
//3. if filter have value, show filter
//4.    else: show update, which is the default 

import {log} from '../../chalk/log'

import React from "react";
//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";
//need to declare the 2 const below
import { checkDataIfLatest } from './pagehelper'
import {format} from 'date-fns'
//needs to be declare to all pages
//change value
const DATACACHE = 'data'
const CACHE = 'cacheblogs'
const PAGE = 'blog'



function Blog(props) {
    const history = useNavigate();

    return <CBlog {...props} history={history}/>
}

class CBlog extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      update:'Loading...',
      category: [],
      year: [],
      month: [],
      filter: null,
    };
  }

  formatter(data){    

    if (typeof data !== typeof []) return <div>Loading...</div>             
    data = data.map(item=>{    
      const date = new Date(item.created)
      const fdate = format(date,'yyyy')
     
      
      return (
        <div key={item._id} className="blogs_item">
          <div className="blogs_img"><img src={item.thumb}alt={"thumbnail for " + item.title} loading="lazy"/></div>
          <div className="blogs_desc">
            <div className="blogs_top">
              <div><div>{item.title}</div></div>
              <div className="utime"><div>{format(date,fdate===format(Date.now(),'yyyy')?'EEE MMM dd':'EEE MMM dd yyyy')}</div></div>
            </div>
            <div className="blogs_summary"><div>{item.summary}</div></div>
            <div className="blogs_bottom">
              <div><div>{item.category.map(i=>`#${i}`).join(' ')}</div></div>
              <div className="visitpage"><div><a href={item.url}>visit the page</a></div></div>
            </div>
          </div>
        </div>
      )
    })
    return data;
  }

  get_uniques(data) {    
    const setcategory = new Set()
    const setyear = new Set()
    const setmonth = new Set()
    data.forEach(item => {
      const date = new Date(item.created)
      const fdate = format(date,'yyyy')
      const mdate = format(date,'MMM')
        
      //add unique category, year, month
      setyear.add(fdate)      
      item.category.forEach(cat => setcategory.add(cat))
      setmonth.add(mdate)
    })
    
    log(['category','year','month'],[setcategory,setyear,setmonth])

    this.setState({
      category:[...setcategory],
      year:[...setyear],
      month:[...setmonth]
    })
    
  }

  async blogs_update_data() {
    //use for testing
    //this will remove cache
    window.localStorage.removeItem(CACHE)

    //check cache for data
    //data exists: check for update
    //data not exists: fetch Data from server
    let cache_data = window.localStorage.getItem(CACHE)
    //console.log(cache_data)
    let blogs = 'Loading...'
    if (cache_data === null) {
      cache_data = JSON.parse(window.localStorage.getItem(DATACACHE))
      
      if (cache_data !== null) {
        const category = cache_data.category
        blogs = cache_data.blogs;
        //console.log(DATACACHE,blogs)  
        blogs = blogs.map(item => {
          const c = category.filter(citem =>citem.id === item._id)
          if (c.length>0)item.category = c[0].category
          return item
        })    
        
        window.localStorage.setItem(CACHE,JSON.stringify({blog: blogs}))
        
      }      
    } else {
      blogs = JSON.parse(cache_data)[PAGE]
      //console.log(CACHE,blogs)
    }
    this.get_uniques(cache_data!==null?cache_data.blogs:blogs);
    await this.setState({update: blogs});
    
        
    //check for update
    //imported function
    let data = await checkDataIfLatest(PAGE,CACHE)
    //now use the dispatch
    //segregate information
    //await this.props.dispatchBlog(data);
    if (data!==null){
      await this.setState({update: data});
      window.localStorage.setItem(CACHE,JSON.stringify({blog: data}))
    }
  }
  
  formatFilter = (category,year,month) => {
    if (this.state.category.length<=0 || this.state.year.length<=0 || this.state.month.length<=0){
      return (<>Filter</>)
    }else {
      category = category.map(item=><button key={item}>{item}</button>)
      year = year.map(item=><button key={item}>{item}</button>)
      month = month.map(item=><button key={item}>{item}</button>)
      return (
        <>
          <div key='category'>
            {category}
          </div>
          <div key='year'>
            {year}
          </div>
          <div key='month'>
            {month}
          </div>
        </>
      )
    }
  }

  componentDidMount(){
    this.blogs_update_data()    
    
  }

  render() {
    return (
        <div>
          <div className='blogs'>
            <div className="blog_content">
              <div className="blog_left">
                <div className="blog_top font_vidaloka center_text btop_text">
                  <div><h1>Blogs</h1></div>
                </div>
                <div className="blog_update">
                  <div className="">{this.formatter(this.state.update)}</div>
                </div>
              </div>
              <div className="blog_right">
                <div className="filter">
                  <div>filter</div>
                  <div className="filter_list">{this.formatFilter(this.state.category,this.state.year,this.state.month)}</div>
                </div>
              </div>
          {/*<button onClick={() => { const {history} = this.props; history('/');}} > Go back </button>*/}
          </div>
        </div>
      </div>
    )
  }
}

export{Blog}
