const mutations = {
  SET_NOTES (state, notes)
  {
    state.notes = notes
  },

  SET_ACTIVE_NOTE (state, noteId)
  {
    let [ note ] = state.notes.filter(n => n.id == noteId)      
    note.isActive = true
    state.note = note
  },

  SET_ALL_NOTES_INACTIVE (state)
  {
    state.note = state.notes.map(n => n.isActive = false)
  },

  ADD_NEW_NOTE (state, note)
  {
    state.notes.unshift(note)      
  },

  SET_USER_DATA (state, payload)
  {
    state.user.jwt = payload.jwt
    state.user.email = payload.email
  },

  SET_XHR_MESSAGE (state, payload)
  {
    state.xhrMessages[payload.key] = payload.message
  },

  TOGGLE_FETCHING (state)
  {
    state.isFetchingNotes = !state.isFetchingNotes
  }
}


export default mutations