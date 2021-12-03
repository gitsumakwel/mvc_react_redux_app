import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function Courseworx(props) {
    const history = useNavigate();

    return <CCourseworx {...props} history={history}/>
}

class CCourseworx extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <p>Coursework Page</p>
            <p>Coursework Section: {this.props.state.system.inputcourseworx}</p>
            <button
                onClick={() => {
                    const {history} = this.props;
                    history('/');
                }}
            >
                Go back
            </button>

            <p>You were redirected from 'HomePage'</p>
        </div>
    )
  }
}

export{Courseworx}
