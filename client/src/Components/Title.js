import React from "react"

function Title(props){
    return(
        <section className="waves">
            <svg xmlns="http://www.w3.org/2000/svg" className="wave" id="wave1"viewBox="0 0 1440 320"><path fill="#3cffff" fill-opacity="1" d="M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,101.3C840,107,960,149,1080,149.3C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="wave" id="wave2"viewBox="0 0 1440 320"><path fill="#3cffff" fill-opacity="1" d="M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,101.3C840,107,960,149,1080,149.3C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="wave" id="wave3"viewBox="0 0 1440 320"><path fill="#3cffff" fill-opacity="1" d="M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,101.3C840,107,960,149,1080,149.3C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <div class="title-under-wave">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div className="gradient"></div>
        </section>
    )
}

export default Title