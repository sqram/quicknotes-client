/**
 * This plugin will insert a Authorization header
 * on all axios requests, if the user is logged in.
 * We determine if user is logged in if there's a 
 * user.jwt token in localStorage.
 * 
 * It also changes the request url depending if we are on
 * localhost or not.
 */

import axios from 'axios'

var jwt = ''
if (window.localStorage.getItem('vuex'))
{
  let localStoreData = JSON.parse(window.localStorage.getItem('vuex'))

  if (localStoreData.user.jwt)
  {   
    jwt = localStoreData.user.jwt
  }
}

axios.defaults.baseURL = !!window.location.href.match(/localhost/) ? 'http://localhost:3001' : 'https://quicknotes.appspot.com/'
if (jwt)
{
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

export default axios