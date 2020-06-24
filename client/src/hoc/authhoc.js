import React,{Component} from 'react';
import axios from 'axios';

export default function(ComposedClass,reload,roled){
    class AuthenticationCheck extends Component {
        state = {
            Loading:true,
            user:null
        }
        auth(){
            axios.get('/api/auth')
            .then( response => {
                const object = response.data
                this.setState({
                    user: object,
                    Loading: false
                })
                
                if(!object.isAuth){
                    if (reload){
                        this.props.history.push('/login-page')
                    }
                }else{
                    if (reload === false){
                        if(this.state.user.role === "admin"){
                            console.log("admin")
                            this.props.history.push('/admin')
                        }
                        if(this.state.user.role === "teacher"){
                            console.log("teacher")
                            this.props.history.push('/teacher')
                        }
                        if(this.state.user.role === "mentor"){
                            this.props.history.push('/mentor')
                        }
                        if(this.state.user.role === "hod"){
                            this.props.history.push('/hod')
                        }
                        if(this.state.user.role === "cfcommittee"){
                            this.props.history.push('/cfcommittee')
                        }
                    }    
                }

            })
            .catch(function (error) {
                const object = error
                this.setState({
                    user: object,
                    Loading: false
                })
            })
        }
        UNSAFE_componentWillMount(){
            this.auth()
        }
        render(){
            if(this.state.Loading){
                return (
                    <div className="loader"> 
                        Loading... 
                    </div>
                )
            }
            if(roled !== this.state.user.role){
                if(this.state.user.role === "admin"){
                    this.props.history.push('/admin')
                }
                if(this.state.user.role === "teacher"){
                    this.props.history.push('/teacher')
                }
                if(this.state.user.role === "mentor"){
                    this.props.history.push('/mentor')
                }
                if(this.state.user.role === "hod"){
                    this.props.history.push('/hod')
                }
                if(this.state.user.role === "cfcommittee"){
                    this.props.history.push('/cfcommittee')
                }
            }
            return(
                <ComposedClass {...this.props}  user={this.state.user}/>
            )
        }       
    }
    return AuthenticationCheck;
}