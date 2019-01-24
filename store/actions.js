import axios from '~/plugins/axios'



const actions = {

  /**
   * Returns all notes from a user
   */
  async getAllNotes ({ commit })
  {
    commit('TOGGLE_FETCHING')   
    let notes = await axios.get('/notes')
    commit('TOGGLE_FETCHING')   
    return notes.data
  },


  /**
   * Fill/update state.notes, which hold all notes.
   * Typically called on component load   
   */
  async updateNote ({ commit, state }, noteObj)
  {     
    let req = await axios.post('/save-note', noteObj)       
  },


  /**
   * Adds a new note to the stack of state.notes   
   */
  async addNewNote ({ commit })
  {      
    let req = await axios.post('/create-note') 
    if (req.data.status == 'success')
    {              
      let noteObj = req.data.payload.note
      commit('ADD_NEW_NOTE', noteObj)       
      commit('SET_ALL_NOTES_INACTIVE')        
      commit('SET_ACTIVE_NOTE', noteObj.id)
    }
  },

  async deleteNote ({ commit, state }, id)
  {
    let req = await axios.delete(`/delete-note?id=${id}`)
    let notes = state.notes.filter( n => n.id != id)
    commit('SET_NOTES', notes)
    
  },

  // Registers or signs a user in
  async auth ({ commit, state }, payload)
  {
    let req = await axios.post(payload.api, payload)
    if (req.data.status == 'success')
    {
      window.location.href = '/'
    }

    commit('SET_USER_DATA', {
      email: payload.email,
      jwt: req.data.jwt
    })

    commit('SET_XHR_MESSAGE', {
      key: 'auth',
      message: req.data.payload.message
    })        
  },

}


export default actions