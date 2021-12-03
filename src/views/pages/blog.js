import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function Blog(props) {
    const history = useNavigate();

    return <CBlog {...props} history={history}/>
}

class CBlog extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <p>Blog Page</p>
            <p>Blog Section: {this.props.state.system.inputblog}</p>
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

export{Blog}
