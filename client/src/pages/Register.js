import React,{useContext,useState} from 'react'
import {Button,Form} from 'semantic-ui-react' 
import axios from 'axios'
import { useAlert } from 'react-alert'

import {AuthContext} from '../context/auth'

export default function Register(props) {
    const context = useContext(AuthContext)
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
        // password:''
    })

    const [errors,setErrors]=useState({});
   
    const alert = useAlert()

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(values);
        axios.post('http://107.23.60.251:5000/api/v1/user',values)
        .then(resp=>{
            // console.log(resp)
            context.login(values);
            props.history.push('/')
            alert.show(<div style={{ color: 'green' }}>"Successfully Registered  Login to post your blog"</div>)
        }).catch(err=>{
            alert.show(<div style={{ color: 'red' }}>"Enter a Valid Email, username,password "</div>)    
        })
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                  label='name'
                  placeholder="name.."
                  name="name"
                  value={values.username}
                  onChange={onChange}  required />
                  <Form.Input
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange}  required/>
                  <Form.Input
                  label='password'
                  placeholder="password.."
                  name="password"
                  value={values.password}
                  onChange={onChange} required/>

                  <Button type="submit" primary>
                      Register
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
