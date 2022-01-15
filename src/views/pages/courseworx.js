//TODO:
//1.same with blogs and projects
//2.copy paste
//3.change formatter to design

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
const CACHE = 'cacheworks'
const PAGE = 'work'

function Courseworx(props) {
    const history = useNavigate();

    return <CCourseworx {...props} history={history}/>
}

class CCourseworx extends React.Component{
  constructor(props){
    super(props);
    this.state = { update:'Loading...'};
  }

  formatter(data){    
    if (typeof data !== typeof []) return <div>Loading...</div>             
    data = data.map(item=>{    
      const date = new Date(item.created)
      return (
        <div key={item._id}>
          <div className="works_img"><img src={item.thumb}alt={"thumbnail for " + item.title} loading="lazy"/></div>
          <div className="works_desc">
            <div className="works_top">
              <div><div>{item.title}</div></div>
              <div className="utime"><div>{format(date,format(date,'yyyy')===format(Date.now(),'yyyy')?'EEE MMM dd':'EEE MMM dd yyyy')}</div></div>
            </div>
            <div className="works_summary"><div>{item.summary}</div></div>
            <div className="works_bottom">
              <div><div>{item.category.map(i=>`#${i}`).join(' ')}</div></div>
              <div className="visitpage"><div><a href={item.url}>visit the page</a></div></div>
            </div>
          </div>
        </div>
      )
    })
    
    return data;
  }

  async works_update_data() {
    //use for testing
    //this will remove cache
    // window.localStorage.removeItem(CACHE)

    // window.localStorage.removeItem('data')
    //check cache for data
    //data exists: check for update
    //data not exists: fetch Data from server
    let cache_data = window.localStorage.getItem(CACHE)
    let works = 'Loading...'
    if (cache_data === null) {
      cache_data = JSON.parse(window.localStorage.getItem(DATACACHE))
      
      if (cache_data !== null) {
        const category = cache_data.category
        works = cache_data.works;
        //console.log(DATACACHE,works)  
        works = works.map(item => {
          const c = category.filter(citem =>citem.id === item._id)
          if (c.length>0)item.category = c[0].category
          return item
        })    
        window.localStorage.setItem(CACHE,JSON.stringify({work: works}))
            
      }      
    } else {
      works = JSON.parse(cache_data)[PAGE]
      // console.log(CACHE,works)
    }
    await this.setState({update: works});
    
        
    //check for update
    //imported function
    let data = await checkDataIfLatest(PAGE,CACHE)
    //now use the dispatch
    //segregate information
    //await this.props.dispatchBlog(data);
    if (data!==null){
      await this.setState({update: data});
      window.localStorage.setItem(CACHE,JSON.stringify({work: works}))
    }
  }

  componentDidMount(){

    this.works_update_data()           
 
  }

  render() {
    return (
        <div>
          <div className='works'>
              <div className="works_label font_home">
                <div className="home_content">
                    <div className="font_vidaloka htop_first center_text wtop_text">
                      <div><h1>Coursework</h1></div>
                    </div>
                </div>
              </div>
              <div className="home_content">
              <div className="works_content">{this.formatter(this.state.update)}</div>
              </div>
          </div>
          {/*<button onClick={() => { const {history} = this.props; history('/');}} > Go back </button>*/}

        </div>
    )
  }
}

export{Courseworx}
