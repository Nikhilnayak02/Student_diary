// import React,{useState,useEffect,useContext} from 'react';
// import axios from 'axios'
// import { Segment, Header,Divider } from 'semantic-ui-react'

// export default function Blogpost(props) {

//     const [posts,setPosts]=useState([])
//     const [users,setUser]=useState([])
   
//     // console.log(props)


//     useEffect(()=>{
//         axios.get('http://127.0.0.1:5000/users/allblogs')
//         .then(res=>{
//             // console.log()
//             setPosts(res.data).reverse()
//         }).catch((err)=>{
//             console.log(err);
//         })
//     },[])

//     useEffect(()=>{
//         axios.get('http://127.0.0.1:5000/users')
//         .then(res=>{
//             // console.log()
//             setUser(res.data)
//         }).catch((err)=>{
//             console.log(err);
//         })
//     },[])

 

//     return (
//     <div>
//         <Divider section />
             
    
//         {posts.map(post=><Segment><Header as='h3'>{post.post}</Header></Segment>)}
    

//    </div>
               
                
       
//     )
// }
