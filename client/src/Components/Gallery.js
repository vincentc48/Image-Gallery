import React from "react"
import axios from "axios"
import Image from "./Image"
import Loading from "./Loading"

class Gallery extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            images: [], //an array of image components sorted based on their respective heights.
            placeholder: [],// just to bring in all the images at the start. use a placeholder to avoid the "flicker"
            username: "",
            isLoading: true
        }
    }

    componentDidMount(){
        axios.get("/api/allimages")
            .then(allimages => { 
                this.setState({placeholder: allimages.data.map(image => {
                    return <Image url={image.url} isInCollection={false} description={image.description} name={image.name} updateImages ={this.checkUserImages} id={image._id}/>
                })})
                console.log(this.state.images)
                this.checkUserImages();
                axios.post("/auth/username",{token: sessionStorage.getItem("token")})
                    .then(res =>{
                        this.setState({username:res.data,isLoading:false})
                    })
                    .catch(err => {
                        this.setState({isLoading:false})
                        return err
                    })
            })
    }

    sorting= (images) =>{
        
    }

    //if user is logged in, calls the api for their images and checks if all the images are or are not user images. 
    //does not return anything, just automatically changes state
    checkUserImages = () => {
            axios.post("/auth/images",{"token": sessionStorage.getItem('token')})
                .then(res => {
                    var userImageIds = res.data.map(element => element._id);
                    console.log(userImageIds);
                    var imagesVar = this.state.placeholder.map(element => {
                            var isUser = userImageIds.includes(element.props.id);
                            if (isUser !== element.props.isInCollection) return <Image url={element.props.url} isInCollection={isUser} description={element.props.description} name={element.props.name} updateImages ={this.checkUserImages} id={element.props.id}/> //New Image element with the isInCollection changed
                            return element;
                        })

                    //if it is a personal gallery, do a filter. Anything not in collection fails the test and is filtered out
                    if (this.props.isPersonal){
                        imagesVar = imagesVar.filter(element => element.props.isInCollection)
                    }

                    this.setState({images: imagesVar})
                })
                .catch(err => {
                    this.setState(prevState => {
                        return {images: prevState.placeholder.map(element => {
                            if (!element.props.isInCollection) return <Image url={element.props.url} isInCollection={false} description={element.props.description} name={element.props.name} updateImages ={this.checkUserImages} id={element.props._id}/> //New Image element with the isInCollection changed
                            return element;
                        })}
                    })
                })
    }

    render(){
        return(
            <div>
            <div className="mygallery"><h2>{this.props.isPersonal?"My Gallery":"All Images"}</h2></div>
            {this.props.isPersonal?<div className="username">@{this.state.username}</div>:""}
            {this.state.images.length==0?<div className="nopictures"><div className="no-pictures-text">No Pictures Yet</div><a href="/#gallerylocation" className="add-images-button">Add Them Here</a></div>:""}
            <a id="gallerylocation"></a>
            <section className="gallery">
                {this.state.isLoading?<Loading/>:this.state.images}
            </section>
            </div>
        )
    }    
}

export default Gallery