import { useState } from 'react'
import './App.css'
import CreateContactDialog from './components/contacts/CreateContactDialog'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { useAppDispatch, useAppSelector } from './hooks'
import { Contact } from './models/contact'
import { Button } from './components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

export default function App() {
  const contacts = useAppSelector(state => state.contacts.contacts)
  const [search, setSearch] = useState('')
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [contactId, setContactId] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const filteredContacts = search.length
    ? contacts.filter((contact: Contact) => {
        const searchTerm = search.toLowerCase()
        return (
          contact.name?.toLowerCase().includes(searchTerm) ||
          contact.email?.toLowerCase().includes(searchTerm)
        )
      })
    : contacts

  function openDialog(contactId: string | null = null) {
    if (contactId) {
      setContactId(contactId)
    } else {
      setContactId(null)
    }
    setIsDialogOpened(true)
  }

  async function confirmRemoveContact(contactId: string) {
    const confirm = window.confirm(
      'Are you sure you want to remove this contact?'
    )
    if (confirm) {
      await dispatch({
        type: 'contact/removeContact',
        payload: contactId,
      })
    }
  }

  return (
    <>
      <Card className="w-full p-6">
        <div className="flex items-center justify-between">
          <section className="text-left">
            <h1 className="text-2xl font-bold">Contacts</h1>
          </section>
          <Button onClick={() => openDialog()}>Create</Button>
          <CreateContactDialog
            contactId={contactId}
            isDialogOpened={isDialogOpened}
            setIsDialogOpened={setIsDialogOpened}
          />
        </div>
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={event => setSearch(event.target.value)}
        ></Input>
        <Table className="w-full">
          <TableHeader>
            {filteredContacts.length ? (
              <TableRow>
                <TableHead className="w-2/5">Name</TableHead>
                <TableHead className="w-2/5">Email</TableHead>
                <TableHead className="w-1/5"></TableHead>
              </TableRow>
            ) : null}
          </TableHeader>
          <TableBody>
            {filteredContacts.length ? (
              filteredContacts.map(contact => (
                <TableRow key={contact.id} className="group">
                  <TableCell className="text-left truncate">
                    {contact.name}
                  </TableCell>
                  <TableCell className="text-left truncate">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Pencil
                      onClick={() => openDialog(contact.id)}
                      className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-blue-500"
                    />
                    <Trash2
                      onClick={() => confirmRemoveContact(contact.id)}
                      className="w-5 h-5 mr-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-red-500"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No contacts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
