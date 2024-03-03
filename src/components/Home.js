import React, { useState, useEffect } from 'react'
import Notes from './Notes'
import axios from 'axios'
import noteService from '../services/notes'


const Home = () => {
  return <Notes user_id={null}/>
}

export default Home