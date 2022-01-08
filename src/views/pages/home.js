import React from "react"
// import SplitText from 'react-pose-text'
//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom"
//need to declare the 2 const below
import { fetchData, mergeSortLimit, submitMessage } from './pagehelper'
import { format }  from 'date-fns'
import $ from 'jquery'
import { tilter } from './SimpleTilt'


//needs to be declare to all pages
//change value
const CACHE = 'data'
const PAGE = 'home'

/* const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 23
  }
}; */

function Home(props) {
    const history = useNavigate();
    return <CHome {...props} history={history}/>
}

class CHome extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      update : 'Loading...',
      category: '',
    }

  }

  async checkDataIfLatest(cache_data){
    const fdata = await fetchData(PAGE,CACHE,null)
    const cdata = Object.assign({},cache_data)
    //get top items for blogs, works, projects, comments
    //compare the lastupdate

    if (fdata.blogs[0].lastupdate===cdata.blogs[0].lastupdate
      && fdata.works[0].lastupdate===cdata.works[0].lastupdate
      && fdata.projects[0].lastupdate===cdata.projects[0].lastupdate)return null

    return fdata
  }

  //data = [{}]
  formatter(data) {
      
      if (typeof data !== typeof []) return <div>Loading...</div>      
      let formatData = Object.assign([],data)
      
      const update_area = {
        left : {
          gridTemplateColumns: '1fr 38%',
        },
        right : {
          gridTemplateColumns: '38% 1fr',
        },
        areaLeft : {
          gridArea: 'left',
        },
        areaRight : {
          gridArea: 'right',
        },
      }

      formatData = formatData.map((item,index) => {       
        const date = new Date(item.created)
        const bgcolor = ['#4D5773','#F6645D','#04D2B4']
        
        return (
          <div className='update_content' style={(index+1)%2===0?update_area['right']:update_area['left']} key={item._id}>
            <div className='update_desc' style={(index+1)%2===0?update_area['areaRight']:update_area['areaLeft']}>
              <div className='update_top'>
                <div className="content_title" style={{color:bgcolor[index%bgcolor.length]}}><div className="uc_margin">{item.title.replace(/(\b[a-z])/g,x=>x.toUpperCase())}</div></div>
                <div className="update_created font_small update_date utime"><div className="uc_margin update_date_elem">{format(date,format(date,'yyyy')===format(Date.now(),'yyyy')?'dd MMM | EEE':'dd MMM yyyy | EEE')}</div></div>
              </div>
              <div className="content_summary"><div className="uc_margin">{item.summary}</div></div>
              <div className="update_bottom">
                <div className="update_categories font_small"><div className="uc_margin">{item.category.map((item)=>`#${item}`).join(' ')}</div></div>
                <div className="visitpage"><div className="uc_margin update_date"><a href={item.url}>visit the page</a></div></div>
              </div>
            </div>
            <div className="update_img" style={(index+1)%2===0?update_area['areaLeft']:update_area['areaRight']} style={{backgroundColor:bgcolor[index % bgcolor.length]}}><img src={item.thumb} alt={"thumbnail for " + item.title} loading="lazy"/></div>
          </div>
        )
    })

    return formatData;
  }

  async sendMessage(event) {
    event.preventDefault();
    const name = $('#name')
    const email = $('#email')
    const msg = $('#message')
    const res = await submitMessage(name.val(),email.val(),msg.val())
    if (res!==null) {
      name.val('')
      email.val('')
      msg.val('')
    } 
  }

  async home_update_data() {
    //use for testing
    //this will remove cache
    // window.localStorage.removeItem(CACHE)

    //check cache for data
    //data exists: check for update
    //data not exists: fetch Data from server
    const cache_data = JSON.parse(window.localStorage.getItem(CACHE))

    //A -> select only 3 most updates, do not include 'comments'
    let merged_data = []
    if (cache_data !== null) {
      //merge and sort
      //data => { key: [array], key: [array], ...}
      //exclude => [key, key, ...]
      //mergeSortLimit(container,data,sort,limit,exclude)
      merged_data = await mergeSortLimit(merged_data,cache_data,-1,3,['comments','category'])           
      //find category for each data in merged_data
      for (let i=0;i<merged_data.length;i++){
        const filtered = cache_data.category.filter(item=>item.id===merged_data[i]._id)
        if (filtered.length > 0) merged_data[i].category = filtered[0].category
      }
      // merged_data = await this.formatter(merged_data);
      
      await this.setState({ update: merged_data })
    }    
    //lets fetch updated data
    let data = cache_data!==null?await this.checkDataIfLatest(cache_data):await fetchData(PAGE,CACHE)  
    if (cache_data===null||data===null) window.localStorage.setItem(CACHE,JSON.stringify(data))  
    //A
    merged_data = []
    if (data!==null) {
        merged_data = await mergeSortLimit(merged_data,data,-1,3,['comments','category'])        

        // merged_data = await this.formatter(merged_data);
        // fdata = await this.formatter(merged_data)
        // $('#fdata').html({fdata})
        for (let i=0;i<merged_data.length;i++){
          const filtered = data.category.filter(item=>item.id===merged_data[i]._id)
          if (filtered.length > 0) merged_data[i].category = filtered[0].category
        }
       await this.setState({update: merged_data});
     }
  }

  async componentDidMount(){

    this.home_update_data();

     document.getElementById('message_form').addEventListener('submit',this.sendMessage,false);
     tilter('.home_top',{
      perspective: 1000, // Default 400
      maxTilt: 20, // Default 4
      mantain: false, // Default false
      fx3d: false, // Default false
      fxDistance: 120, // Default 40
    })

    //TODO:
    //1.
    //select all children
    //add css for animation when on view
    //fade in when going down
    //face out when going up (optional)
    //2.
    //adjust spacing of sections
    //must be one screen or more per section
  }

  render() {
    return (
        <div className='home'>

         {/*<SplitText initialPose="exit" pose="enter" charPoses={charPoses}>Welcome Home</SplitText>*/}
            <div className="home_top font_home">
              <div className="home_content fx3d">
                <div className="font_vidaloka htop_text">
                  <div className="htop_first center_text">
                    <div><h1>Frontend</h1></div>
                    <div className="font_staatliches htop_period"><h1>.</h1></div>
                    <div><h1>Backend</h1></div>
                  </div>
                  <div className='htop_second'><h1>Developer</h1></div>
                </div>
              </div>
            </div>
            <div className="home_update">
              <div className="home_content">
                <div><h2 className="font_title">UPDATES</h2></div>
                <div><p className="font_subtitle">recent activities, projects, writings</p></div>                
                {this.formatter(this.state.update)}
              </div>
            </div>
            <div className="home_schema">
              <div className="home_content">
                <div><h2 className="font_title">SCHEMA</h2></div>
                <div><p className="font_subtitle">things you want to know about the site</p></div>
                <div className="schema_content_row">
                  <div className="schema_div"><div className="schema_content_col">
                    <div className="uc_margin schema_col_start">Coursework</div>
                    <div className="uc_margin">work accomplished from rigorous study or practice</div>
                  </div></div>
                  <div className="schema_div"><div className="schema_content_col">
                    <div className="uc_margin schema_col_start">Projects</div>
                    <div className="uc_margin">projects completed for a client or produced with a group</div>
                  </div></div>
                  <div className="schema_div"><div className="schema_content_col">
                    <div className="uc_margin schema_col_start">Blogs</div>
                    <div className="uc_margin">writings on any interest, especially about software development</div>
                  </div></div>
                </div>
              </div>
            </div>
            <div className="home_message">
              <div className="home_content">
                <div><h2 className="font_title">Message</h2></div>
                <div><p className="font_subtitle">send me your inquiries</p></div>
                <div className="message_content uc_margin">
                  <form id="message_form">
                  <div className="message_form_content">
                    <div className="message_client_info">
                      <input id="name" type="text" name="name" placeholder="name*" />
                      <input id="email" type="email" name="email" placeholder="email*" />
                    </div>
                    <div className="message_client_action">
                      <textarea id="message" name="message" placeholder="message*" cols='50' rows='5'>
                      </textarea>
                      <input className="message_button" type="submit" value="Submit" />
                    </div>
                  </div>
                  </form>

                </div>

              </div>
            </div>

        </div>
    )
  }
}

export{Home}
