import React from 'react';

interface IState {
    url: string | ""
}

export default class BannerImage extends React.Component<{}, IState>{
    constructor(props: any){
        super(props)
        this.state = {
            url: props.url,
        }
        
    }
    render(){
        return(
            <div className="bannerImage">
                <img src={this.state.url} alt=""/>
            </div>
        )
    }
}