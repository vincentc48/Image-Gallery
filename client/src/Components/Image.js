import React from "react"
import axios from "axios"

class Image extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    modifyCollection = () =>{
        if (this.props.isInCollection){
            axios.post("/auth/delete/"+this.props.id,{token: sessionStorage.getItem('token')})
                .then(res => {
                    console.log(res.data)
                    this.props.updateImages();
                })
                .catch(err=>{// COME BACK HERE!!!   REDIRECT TO LOGIN IF NOT LOGGED IN (AND DELETE TOKEN BECAUSE ITS PROBABLY EXPIRED)
                    window.location = "/account"
                })
        }else{
            axios.post("/auth/addimage/"+this.props.id,{token: sessionStorage.getItem('token')})
                .then(res => {
                    console.log(res.data)
                    this.props.updateImages();
                })
                .catch(err=>{// COME BACK HERE!!!   REDIRECT TO LOGIN IF NOT LOGGED IN (AND DELETE TOKEN BECAUSE ITS PROBABLY EXPIRED)
                    window.location = "/account"
                })
        }
    }

    render(){
        return(
        <div className="image">
            <img src={this.props.url}></img>
            <div className="image-labels">
                <h3>{this.props.name}</h3>
                <div style={{display: this.props.isInCollection?"block":"none"}} className="fa fa-check-circle"></div>
            </div>
            <div class="image-other">
                <button className="add-remove-image" type="button" onClick={this.modifyCollection}>{this.props.isInCollection?"Remove":"Add"} this Image</button>
            </div>
        </div>
    )
    }
}

export default Image