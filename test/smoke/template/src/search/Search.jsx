import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './search.scss'
class Seach extends Component{
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
            </div>
        )
    }
}

ReactDOM.render(<Seach/>,document.getElementById('root'))