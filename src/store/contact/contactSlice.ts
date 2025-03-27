import { Contact } from '@/models/contact'
import { createSlice } from '@reduxjs/toolkit'

export interface ContactState {
  contacts: Contact[]
}

const initialState: ContactState = {
  contacts: [
    { id: 'a1b2c', name: 'John Doe', email: 'john.doe@example.com' },
    { id: 'x9y8z', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 'p3q4r', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 'm5n6o', name: 'Bob Brown', email: 'bob.brown@example.com' },
    { id: 't7u8v', name: 'Charlie Davis', email: 'charlie.davis@example.com' },
  ],
}

export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    createContact: (state, action) => {
      const newContact: Contact = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      }
      state.contacts.push(newContact)
    },
    updateContact: (state, action) => {
      const { id, name, email } = action.payload
      const updatedContact: Contact = {
        id,
        name,
        email,
      }
      const index = state.contacts.findIndex(contact => contact.id === id)
      state.contacts[index] = updatedContact
    },
    removeContact: (state, action) => {
      const id = action.payload
      const index = state.contacts.findIndex(contact => contact.id === id)
      state.contacts.splice(index, 1)
    },
  },
})

export const { createContact, updateContact, removeContact } =
  ContactSlice.actions
export default ContactSlice.reducer
