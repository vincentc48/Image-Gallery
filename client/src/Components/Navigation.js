import React from "react"
import {Link} from "react-router-dom"

class Navigation extends React.Component{
    constructor(){
        super()
        this.state={
            isDropdown: true,//true to display, false to hide
            isSmallScreen: true
        }
    }

    componentDidMount(){
        this.setState({isDropdown: window.innerWidth>575, isSmallScreen: window.innerWidth<=575})
        document.addEventListener('resize',()=>{
            console.log('resizing')
            this.setState({isSmallScreen: window.innerWidth<=575})
            if(window.innerWidth>575) this.setState({isDropdown: true})
        })
    }

    switchDropdown = () =>{
        if (window.outerWidth<=575) {
            console.log("hello again")
            this.setState((prevState)=> {return ({isDropdown: !prevState.isDropdown})})}
    }

    generateClassesString = () =>{
        var classesString = this.state.isDropdown?"nav-buttons":"nav-buttons hidden"
            classesString += this.state.isSmallScreen?" positionedAbsolute":"";
        console.log(classesString)
        return (classesString)
    }

    render(){
        var classesString = this.state.isDropdown?"nav-buttons":"nav-buttons hidden"
            classesString += this.state.isSmallScreen?" positionedAbsolute":"";
        console.log(classesString)
        return(
            <nav>
                <div className="nav-brand">
                    <a href="/" style={{textDecoration: "none", color: "black"}}><h1>Image Gallery</h1></a>
                </div>
                <button type="button" class="dropdown" style={{display: this.state.isSmallScreen?"block":"none"}} onClick={this.switchDropdown}><span className="fa fa-bars"></span></button>
                <div className={classesString}>
                    <Link to="/about" className="nav-link">About</Link>
                    <a href="/#gallerylocation" className="nav-link">View All</a>
                    <Link to="/account" className="nav-link" id="account-button">My Gallery</Link>
                    <button type="button" class="nav-crossout" style={{display: this.state.isSmallScreen?"block":"none"}} onClick={this.switchDropdown}><span className="fa fa-times"></span></button>
                </div>
            </nav>
        )
    }
}

export default Navigation;