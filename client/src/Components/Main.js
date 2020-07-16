import React from "react"
import Jumbotron from "./Jumbotron"
import Gallery from "./Gallery"
import Title from "./Title"

function Main(){
    return(
        <div>
            <Jumbotron/>
            <Title title="Images" description="Explore beautiful landscapes from coast to coast. View every image in the Image Gallery collection here. From majestic waterfalls to sunny blue skies, you are sure to find an image that you love. Rememeber to create or login into an account to save a personal collection of your favorite images."/>
            <Gallery isPersonal={false}/>
        </div>
    )
}

export default Main