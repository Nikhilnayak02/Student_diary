import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios'
// import DataFetching from './DataFetching'
import { Grid,Card,Feed,Container,Header,Divider } from 'semantic-ui-react'

import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'
import {AuthContext} from '../context/auth'
import Userdetails from '../component/Userdetails';


export default function Home() {
    const [posts,setPosts]=useState([])
    const {user}=useContext(AuthContext)
    const [blogs,setblogs]=useState([])

    // console.log(user.name)
    useEffect(()=>{
        axios.get('http://54.83.252.172:5000/api/v1/users')
        .then(res=>{
            // console.log(res)
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get('http://54.83.252.172:5000/api/v1/users/allblogs')
        .then(res=>{
            // console.log()
            setblogs(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])


    return (

        
            <Grid >
              <Grid.Column width={4}>
               
              {user && (
                          <Grid.Column>
                              <Userdetails user={user.name}/>
                          </Grid.Column>
                      )}

               {!user &&
                   <Grid.Column>
                        <Divider section />
                          
                   <Card
                        fluid
                        header='Team'   
                        description='Nikhil Nayak : PES1PG20CS026 Chiranthan KS : PES1PG20CS012
                        Smitha S : PES1PG20CS032 '
                        color="grey"
                        
                    />   
                     <Divider section />      
          </Grid.Column>  
               }                 
              

              </Grid.Column>
              <Grid.Column width={7}>
               
                          {user && (
                          <Grid.Column>
                              <PostForm/>                
                          </Grid.Column>
                      )}

                 {!user &&
                    <Grid.Column>
                         <Divider section />
                                   <Card
                                        raised = "True"
                                        color="blue"
                                        fluid
                                        header='About'   
                                        description=' A digital journal application is simply space on the web, where you can freely write personal experiences and events. So instead of opting for a traditional diary or a notebook where you can pen down your thoughts and express your feelings and creativity, you can use a digital journal application and have it with you anytime, any day and anywhere. '
                                    /> 
                                     <Divider section />
                                     <Card
                                        raised = "True"
                                        color="blue"
                                        fluid
                                        header='What Do You Write In Journey Diary?'   
                                        description=' Journey is designed to enable you to write anything about your life, experiences and private memories. Instead of viewing it as a boring writing session, it actually feels more like you are confiding in a friend who definitely won’t blab. Also, with the Journey digital diary app, you can write on the go. Simply put down the highlights of your day or any reflections on your device.'
                                    /> 
                                     <Divider section />        


                                    

                          </Grid.Column> 
                 }         


              </Grid.Column>
              <Grid.Column width={5}>
              <Grid.Row>

              <Divider section />


                       <Card>
                            <Card.Content>
                            <Card.Header>Users</Card.Header>
                            </Card.Content>
                            <Card.Content>
                            
                                     {  posts && posts.map(post=>(
                                            <Feed.Summary key={post.user_id} style={{marginBottom:20}} >
                                                <PostCard post={post}/>
                                            </Feed.Summary>
                                        ))
                                        }
                                   
                                   
                            </Card.Content>
                        </Card>


                  </Grid.Row>
                  <Divider section />
              </Grid.Column>
              
            </Grid>
          )































        // <div>
        //    {/* <DataFetching/> */}
        //    <Grid columns={3}>
        //           <Grid.Row>
        //             <h1>Recent Posts</h1>
        //           </Grid.Row>
        //           <Grid.Row>
        //               {user && (
        //                   <Grid.Column>
        //                       <PostForm/>
        //                   </Grid.Column>
        //               )}
        //             { 
        //                 posts && posts.map(post=>(
        //                     <Grid.Column key={post.user_id} style={{marginBottom:20}} >
        //                         <PostCard post={post}/>
        //                     </Grid.Column>
        //                 ))
        //             }
        //           </Grid.Row>
        //     </Grid>
           
        // </div>
    
}
