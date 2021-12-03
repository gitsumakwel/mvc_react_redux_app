import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function NotFound() {
    const history = useNavigate();

    return <CNotFound history={history}/>
}

class CNotFound extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <p>404 Not Found</p>
            <button
                onClick={() => {
                    const {history} = this.props;
                    history('/');
                }}
            >
                Go back
            </button>
        </div>
    )
  }
}

export{NotFound}
