
import { Divider,Card,Image,Button,Modal,Header,Form, CardContent } from 'semantic-ui-react'
import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {AuthContext} from '../context/auth'
import { useAlert } from 'react-alert'


export default function Userdetails(props) {

    const {user,logout} = useContext(AuthContext)
    const [posts,setPosts]=useState([])
    const alert = useAlert()
    // const [values,setValues]=usestate([])

    const [values,setValues]=useState({
        // 'name':'',
        'email':''
    })
    

    const onChange1=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }


    //     useEffect(()=>{
    //     axios.get('http://127.0.0.1:5000/users/allblogs')
    //     .then(res=>{
    //         // console.log()
    //         setPosts(res.data).reverse()
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // },[])

    useEffect(()=>{
        axios.get('http://107.23.60.251:5000/api/v1/users')
        .then(res=>{
            console.log(res)
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    function onsubmit(e){
        e.preventDefault();
        if(window.confirm('Are you sure you want to update??')){
  // setBlogs({});
        const b =user.name        
        const a = posts.find(o=>o.name===b)
        if(values.name && values.email!==""){
            axios.put('http://107.23.60.251:5000/api/v1/user/'+a.user_id,values).resp(resp=>console.log(resp))
            .catch(err=>console.log(err))
    
        }else{
            console.log("The post is empty") 
        }
    }}

    function deleteuser(){
        if(window.confirm('Are you sure??')){
            const b =user.name        
            const a = posts.find(o=>o.name===b)
            console.log(a.user_id)
            axios.delete('http://107.23.60.251:5000/api/v1/user/'+a.user_id).then(resp=>console.log(resp))
            .catch(err=>console.log(err))
            logout();
            alert.show(<div style={{ color: 'red' }}>"Successfully Deleted user"</div>)
        }
    }

    // const a = posts.find(o=>o.name===user.name)
    // console.log(a.blogposts[0].post)
    
    // a.blogposts.map(b=>console.log(b.post))
    
    const [open, setOpen] = React.useState(false)
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(values);
        const b =user.name        
        const a = posts.find(o=>o.name===b)
        
            axios.put('http://107.23.60.251:5000/api/v1/user/'+a.user_id,values).then(resp=>console.log(resp)) 
            alert.show(<div style={{ color: 'green' }}>"Successfully Updated"</div>)
            logout();
            
        }
       
        const b =user.email        
        const myname = posts.find(o=>o.email===b)
        
    return (
        <Card>
{/* ---------------------------------------------------------------- */}
    
         
               
        
            
 {/* ==============================================================      */}

        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
        <Card.Content>
        <Card.Header><b>Name : </b>{user.name}</Card.Header>
        <Card.Meta>
            <span className='date'>Joined in 2021</span>
        </Card.Meta>
        <Card.Description>
          {/* {
              a.blogposts.map(b=><p>{b.post}</p>)
          } */}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
     
        
        <Button onClick={deleteuser} inverted color='red'>
        Delete Account
        </Button>
  
        </Card.Content>
        <Divider /><Divider />
        <Card>
              <CardContent>
              <Card.Header>Update User Details</Card.Header>
              <Form onSubmit={onSubmit} noValidate>
                {/* <Form.Input
                  label='name'
                  placeholder="name.."
                  name="name"
                  value={values.username}
                  onChange={onChange1}  required /> */}
                  <Form.Input
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange1}  required/>
                  <Button type="submit" onClick={() => setOpen(false)} primary>
                      Update
                  </Button>
                 </Form>
              </CardContent>
          </Card>
    </Card>

    
    )
}
