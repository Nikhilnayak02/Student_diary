import React,{useState,useEffect,useContext} from 'react'
import {Button,Form} from 'semantic-ui-react' 
import axios from 'axios'
import { useAlert } from 'react-alert'

import {AuthContext}  from "../context/auth"
import userEvent from '@testing-library/user-event'


export default function Login(props) {
    const context = useContext(AuthContext)
    const [values,setValues]=useState({
        email:'',
        password:''
        // password:''
    })

    const [posts,setPosts]=useState([])
    const alert = useAlert()
    useEffect(()=>{
        axios.get('http://54.83.252.172:5000/api/v1/users')
        .then(res=>{
            // console.log(res)
            setPosts(res.data)
            // console.log(posts)
           
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const [errors]=useState({});
   


    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        axios.post("http://54.83.252.172:5000/api/v1/login",values).
        then((res)=>{ console.log(values);
            if(res.data.status==="User exists"){
                context.login({"name":res.data.username})
                props.history.push('/')
                alert.show("Logged in successfully")}
            else{
                alert.show("Unable to login check your email_id and password")
            }}
            )
    }

       


   
    

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1>Login</h1>
                  <Form.Input
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange} required='true'/>
                  <Form.Input
                  label='password'
                  placeholder="password.."
                  name="password"
                  value={values.password}
                  onChange={onChange}/>

                  <Button type="submit" primary>
                      Login
                  </Button>
                 </Form>

                  {Object.keys(errors).length>0 &&(
                    <div className="ui error message">
                     <ul className="list">
                        {Object.values(errors).map(value=>(
                            <li key={value}>{value}</li>
                        ))}
                     </ul>

                 </div>
                  )}

                 
        </div>
    )
}
