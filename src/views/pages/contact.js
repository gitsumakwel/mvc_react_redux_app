import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function Contact(props) {
    const history = useNavigate();

    return <CContact {...props} history={history}/>
}

class CContact extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <p>Contact Page</p>
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

export{Contact}
