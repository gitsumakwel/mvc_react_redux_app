import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function Project(props) {
    const history = useNavigate();

    return <CProject {...props} history={history}/>
}

class CProject extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <p>Project Page</p>
            <p>Project Section: {this.props.state.system.inputproject}</p>
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

export{Project}
