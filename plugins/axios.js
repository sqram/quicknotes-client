import axios from 'axios'

var jwt = ''
try
{
  localStorage = JSON.parse(window.localStorage.getItem('vuex'))
  if (localStorage.user.jwt)
  {
    jwt = localStorage.user.jwt
  }
}
catch (e)
{
  // jwt == ''
}

export default ({ store }) => {    
  return axios.create({
    baseURL: !!window.location.href.match(/localhost/) ? 'http://localhost:3001' : 'https://quicknotes.appspot.com/',
    headers: {'X-jwt-header': jwt}
  });

}