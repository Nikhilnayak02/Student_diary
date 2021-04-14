import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Menubar from './component/Menubar';
import { Container,Progress,Header,Image,Icon } from 'semantic-ui-react'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ParticlesBg from 'particles-bg'


import {AuthProvider} from './context/auth'
import AuthRoute from './context/authroute'


import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '600px',
    transition: 'fade',
    type: 'success',
    // transition: transitions.SCALE
    containerStyle: {
      zIndex: 100
    },
    // options.type === 'success' && ':)'
  }
  return (
  <AlertProvider template={AlertTemplate} {...options}>  
  <AuthProvider>
     <Router>
     <Container>
        <ParticlesBg type="cobweb" num={40} bg={true} />
        
        <Progress percent={100} size='tiny'></Progress>

        <div>
          <Header as='h2' icon textAlign='center'>
          <Icon.Group size='tiny'>
            <Icon name='user' />
          </Icon.Group>
            <Header.Content>Student Diary</Header.Content>
          </Header>
        </div>


        <Menubar/>
        <Progress percent={100} size='tiny'></Progress>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        
     </Container>
   </Router>
  </AuthProvider>
  </AlertProvider>
  );
}

export default App;
