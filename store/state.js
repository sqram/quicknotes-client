const state = {
  user: {
    jwt: null,
    email: null
  },

  // All notes
  notes: [],
  
  // The active note
  note: {title: '', content: ''},
  
  // Options for sorting
  sortOptions: [
    { value: 'createdDateAscending', text: 'Created Date ↑' },
    { value: 'createdDateDescending', text: 'Created Date ↓' },
    { value: 'lastEditedAscending', text: 'Last Edited ↑' },
    { value: 'lastEditedDescending', text: 'Last Edited ↓' }
  ],
  
  // Selected sort option
  selectedOption: 'createdDateDescending',

  xhrMessages: {
    auth: null,        
  }
  
  
}


export default state