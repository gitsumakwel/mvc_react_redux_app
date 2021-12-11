import React from "react";
import $ from "jquery";

//can only be use inside a class if
//the class is wrap inside a function
import {Link} from "react-router-dom";
const headrows = "50px 0px 1fr";
function Header(props) {
    return <CHeader {...props}/>
}

class CHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      appwidth: $(window).width(),
      appheight: $(window).height(),
      menu: false,
      setmenu: false,
      loaded: false,
    }
  }
  windowResize = (event) => {
    this.setState({appwidth: $(window).width(),appheight: $(window).height()},this.displayHeader)
  }

  displayHeader = () => {
    $('#cheaderxl').css('display','grid');
    $('#cheaderxs').css('display','none');
    $('.menubtn').css('display','none');
    $('#headerpage')
       .css('grid-template-columns','1fr 460px 1fr')
       .css('grid-template-rows','1fr')
       .css('width',this.state.appwidth);
    if (this.state.appwidth<=500) {
      $('#cheaderxl').css('display','none');
      $('#cheaderxs').css('display','grid')
      .css('height',this.state.appheight/2);;
      $('.menubtn').css('display','flex');
      $('#headerpage')
        .css('grid-template-columns','1fr');
        //keep the state of small header if change into big screen
      if (this.state.menu)
        $('#headerpage').css('grid-template-rows',headrows);
      else{
        $('#headerpage').css('grid-template-rows',headrows);
        $('#cheaderxs').css('display','none');
      }
    }
  }
  burgerClick = () => {
    $('#cheaderxs').toggle(()=>{
      if ($('#cheaderxs').css('display') === 'none'){
        $('#headerpage')
          .css('grid-template-rows',headrows)
        this.setState({menu:false}, ()=>$('.menubtn').removeClass('open')
        );
      }else {
        $('#headerpage')
          .css('grid-template-rows',headrows)
        this.setState({menu:true},()=>$('.menubtn').addClass('open')
        );
      }
    });
  }

  componentDidMount() {
    this.displayHeader();
    $(window).resize(this.windowResize);
    $('.menubtn').click(this.burgerClick);
    $('#cheaderxs > li > a:-webkit-any-link').click(this.burgerClick);
  }

  render() {
    return (
        <div id="headerpage">
          <div className="menubtn">
            <div className="menuburger"></div>
          </div>
          <ul id='cheaderxl'>
            <li>
              <Link to="/"><p>Home</p></Link>
            </li>
            <li>
              <Link to="/coursework"><p>Coursework</p></Link>
            </li>
            <li>
              <Link to="/project"><p>Project</p></Link>
            </li>
            <li>
              <Link to="/blog"><p>Blog</p></Link>
            </li>
            <li>
              <Link to="/about"><p>About</p></Link>
            </li>
            {/* contact will be floating for all pages*/}
            <li>
              <Link to="/contact"><p>Contact</p></Link>
            </li>
          </ul>
          <ul id='cheaderxs'>
            <li className='spacetop'>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/coursework">Coursework</Link>
            </li>
            <li>
              <Link to="/project">Project</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* contact will be floating for all pages*/}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
    )
  }
}

export{Header}
