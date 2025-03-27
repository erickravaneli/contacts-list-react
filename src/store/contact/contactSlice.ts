import { Contact } from "@/models/contact"
import { createSlice } from "@reduxjs/toolkit"

export interface ContactState {
    contacts: Contact[]
}

const initialState: ContactState = {
    contacts: [
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Smith", email: "jane.smith@example.com" },
        { name: "Alice Johnson", email: "alice.johnson@example.com" },
        { name: "Bob Brown", email: "bob.brown@example.com" },
        { name: "Charlie Davis", email: "charlie.davis@example.com" }
    ]
}

export const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        createContact: (state, action) => {
            const newContact: Contact = {
                name: action.payload.name,
                email: action.payload.email
            }
            state.contacts.push(newContact)
        },
        updateContact: (state, action) => {
            const { index, name, email } = action.payload
            const updatedContact: Contact = {
                name,
                email
            }
            state.contacts[index] = updatedContact
        }
    }
})

export const { createContact } = ContactSlice.actions
export default ContactSlice.reducer