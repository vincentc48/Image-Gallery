import React from "react"
import axios from "axios"
import Login from "./Login"
import Gallery from "./Gallery"
import Loading from "./Loading"

class Account extends React.Component{

    constructor(){
        super();
        this.state= {
            isValid: false,
            isLoading: true
        }
    }

    componentDidMount(){
        this.checkIfValid();
    }

    checkIfValid = () => {
        this.setState({loading: true})
        axios.post("/auth/isvalid",{token: sessionStorage.getItem("token")})
            .then(res =>{
                this.setState({isValid: res.data,isLoading:false})
            })
    }

    logout = () =>{
        sessionStorage.removeItem("token")
        this.checkIfValid()
    }

    render(){
        return(
           <div>
               {this.state.isValid?<button type="button" className="logout-button" onClick={this.logout}>Logout</button>:""}
               {this.state.isLoading?<Loading/>:(this.state.isValid?<Gallery isPersonal={true}/>:<Login refresh={this.checkIfValid}/>)}
           </div>
        )
    }
}

export default Account