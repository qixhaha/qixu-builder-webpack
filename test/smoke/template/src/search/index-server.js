// import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
// import './search.scss'
// import logo from '../../assets/1.jpg'
const logo = require('../../assets/1.jpg')
const  React = require('react');
require('./search.scss')
 
class Seach extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Text:null
        }
    }
    loadComponent(){
        import('./Text.jsx').then((Text)=>{
            this.setState({
                Text:Text.default
            })
        })
    }
    render(){
        const {Text} = this.state;
        return (
            <div onClick={this.loadComponent.bind(this)}>search page!!!!!!!!!
                {
                    Text?<Text/>:null
                }
                <img src={logo}/>
            </div>
        )
    }
}

module.exports = <Seach/>