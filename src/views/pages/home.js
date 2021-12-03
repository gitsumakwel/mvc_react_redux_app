import React from "react";

//can only be use inside a class if
//the class is wrap inside a function
import { useNavigate } from "react-router-dom";

function Home(props) {
    const history = useNavigate();

    return <CHome {...props} history={history}/>
}

class CHome extends React.Component{
  constructor(props){
    super(props);
    this.state = { x:null};

  }

  render() {
    return (
        <div>
            <button
                onClick={() => this.props.history("/about", { from: "About" })}
            >
                About
            </button>

            <button
                onClick={() => this.props.history("/blog", { from: "Blog" })}
            >
                Blog
            </button>
            <button
                onClick={() => this.props.history("/coursework", { from: "Courseworx" })}
            >
                Coursework
            </button>
            <button
                onClick={() => this.props.history("/project", { from: "Project" })}
            >
                Project
            </button>

            <p>Welcome Home</p>

        </div>
    )
  }
}

export{Home}
