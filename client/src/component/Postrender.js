// import React ,{useState,useContext,useEffect} from 'react'
// import axios from 'axios'
// import {Divider,Segment,Header} from 'semantic-ui-react'
// import {AuthContext} from '../context/auth'

// export default function Postrender() {

//     const [blogs,setBlogs]=useState([])
//     const [user1,setUser]=useState([])
//     const {user} = useContext(AuthContext)

//     useEffect(()=>{
//         axios.get('http://127.0.0.1:5000/users')
//         .then(res=>{
//             // console.log(res)
//             setUser(res.data)
//             // console.log(posts)
           
//         }).catch((err)=>{
//             console.log(err);
//         })
//     },[])
   
//     function getblogs(){
//         const b = user.email        
//         const a = user1.find(o=>o.email===b)
//         var id=a.user_id
//         axios.get('http://127.0.0.1:5000/users/blog/'+)
//     .then(res=>{
//         // console.log()
       
//         setBlogs(res.data)
       
//     }).catch((err)=>{
//         console.log(err);
//     })
//     }


//     // useEffect(()=>{
//     //     const interval=setInterval(()=>{
//     //        getblogs();
//     //     },3000);
//     //     return ()=>clearInterval(interval)
//     // },[])


//     return (
//         <div>
//              <Divider section />
//              {blogs.map(blog=><Segment><Header as='h3'>{blog.post}</Header></Segment>)}
//         </div>
//     )
// }
