import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {Feed,Form,Button,Comment,Divider} from 'semantic-ui-react'
import {AuthContext} from '../context/auth'
import Moment from 'react-moment';

// import { useAlert } from 'react-alert'



export default function PostForm() {


    const {user} = useContext(AuthContext)
    const [posts,setPosts]=useState([])
    const [blogs,setBlogs]=useState([])
    const [user1,setUser]=useState([])
    
    useEffect(()=>{
        axios.get('http://54.83.252.172:5000/api/v1/users')
        .then(res=>{
            // console.log(res)
            setUser(res.data)
            // console.log(posts)
           
        }).catch((err)=>{
            console.log(err);
        })
    },[])
       
   
    
    function clearinput(){
       document.getElementById('clear1').value="";
       setBlogs(blogs);   
    }
        useEffect(()=>{
            axios.get('http://54.83.252.172:5000/api/v1/users')
            .then(res=>{
                // console.log(res)
                setPosts(res.data)
            }).catch((err)=>{
                console.log(err);
            })
        },[])


        // useEffect(()=>{
        //     axios.get('http://127.0.0.1:5000/users/allblogs')
        //     .then(res=>{
        //         // console.log()
        //         setBlogs(res.data)
        //     }).catch((err)=>{
        //         console.log(err);
        //     })
        // },[])
   

    // const context = useContext(AuthContext)
    const [values,setValues]=useState({
        'post':''
    })

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    // const alert = useAlert()
    // const forceUpdate = React.useReducer(bool => !bool)[1];

    // const renderpost=(e)=>{
        
    // }
    // const bp=blogs.reverse()
    // console.log(bp)

    function getblogs(){
        const b = user.name        
        const a = user1.find(o=>o.name===b)
        var id= a.user_id
        axios.get('http://54.83.252.172:5000/api/v1/users/blog/'+id)
    .then(res=>{
        // console.log()
       
        setBlogs(res.data)
       
    }).catch((err)=>{
        console.log(err);
    })
    }
    // getblogs();
    const onSubmit=(e)=>{
        
        e.preventDefault();
        getblogs();
        // setBlogs({});
        const b =user.name        
        const a = posts.find(o=>o.name===b)
        if(values.post!==""){
            axios.post('http://54.83.252.172:5000/api/v1/users/'+a.user_id,values)
            values.post=""
            
        }else{
            console.log("The post is empty") 
        }
        getblogs();
         
            // alert(<div style={{ color: 'red' }}>"The post is empty"</div>)         
    }

    return (
        <div>

            <Comment.Group>
                <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{user.name}</Comment.Author>
                    <Comment.Metadata>
                    <div>2 days ago</div>
                    </Comment.Metadata>
                   
                    <Form onSubmit={onSubmit} reply>
                    <Form.TextArea placeholder='Write your blog post......' name="post" id="clear1" onChange={onChange} value={values.body} />
                    <Button
                        content='Post'
                        labelPosition='left'
                        icon='edit'
                        primary
                        type="submit" onClick={clearinput}  color="teal"
                                        />
                    </Form>
                </Comment.Content>
                </Comment>
            </Comment.Group>
            <Button fluid onClick={getblogs}>View my blogs</Button>
            <div>
             <Divider section />
             </div>  
             <Feed> 
            {blogs.map(blog=>
            <Feed.Event>
            <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' wrapped />
            <Feed.Content date={<Moment >{blog.created_on}</Moment>} summary={blog.post} />
            <Divider section />
            </Feed.Event>
            )}     </Feed>  <Divider section /> </div>
    )
}
