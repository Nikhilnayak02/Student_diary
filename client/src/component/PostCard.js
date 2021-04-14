import React from 'react'
import {Feed} from 'semantic-ui-react';

export default function PostCard(props) {
    // console.log(props)
    return (

      <Feed>
        <Feed.Event>
        <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
          <Feed.Content>    
            {/* <Feed.Date content='1 day ago' /> */}
            <Feed.Summary>
              Welcome  {props.post.name}
              <p>{props.post.email}</p>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
      

    ) 
    
}
