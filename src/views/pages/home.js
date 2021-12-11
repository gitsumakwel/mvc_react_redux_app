import React from "react";
import SplitText from 'react-pose-text';
import $ from 'jquery';
import {randomkey} from '../../randomkey';
import {encode} from '../../obfs';

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";
const PHRASE = process.env.REACT_APP_PHRASE;
const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 23
  }
};

function Home(props) {
    const history = useNavigate();
    return <CHome {...props} history={history}/>
}

class CHome extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  componentDidMount(){
    //https://vhudyma-blog.eu/cant-read-environment-variable-in-react/
    const serial = randomkey(10).join('');
    encode('home',serial).then(
      (result) => {
        const body = {serial:serial,type:result}
        $.post('/api/page/latest',body,(data,status,xhr)=>{
          if (status==="success") {
            console.log(data);
          }
        })
      })
  }

  render() {
    return (
        <div>

            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>Welcome Home</SplitText>


        </div>
    )
  }
}

export{Home}
