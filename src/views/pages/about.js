import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function About(props) {
    const history = useNavigate();

    return <CAbout {...props} history={history}/>
}

class CAbout extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <p>About Page</p>
            <p>About Section: {this.props.state.system.inputabout}</p>
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

export{About}
