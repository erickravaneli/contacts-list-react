import { useAppDispatch, useAppSelector } from '@/hooks'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Contact } from '@/models/contact'
import { useEffect, useState } from 'react'

type createContactDialogProps = {
  contactId: string | null
  isDialogOpened: boolean
  setIsDialogOpened: (isDialogOpened: boolean) => void
}

export default function CreateContactDialog({
  contactId,
  isDialogOpened,
  setIsDialogOpened,
}: createContactDialogProps) {
  const contacts = useAppSelector(state => state.contacts.contacts)
  const dispatch = useAppDispatch()
  const [contact, setContact] = useState<Contact>({
    id: getRandomId(),
    name: '',
    email: '',
  })
  const isUpdateContact = Boolean(contactId !== null)

  useEffect(() => {
    if (isDialogOpened) {
      if (contactId) {
        const foundContact = contacts.find(contact => contact.id === contactId)
        if (foundContact) setContact(foundContact)
      } else {
        setContact({ id: getRandomId(), name: '', email: '' })
      }
    }
  }, [isDialogOpened])

  function getRandomId() {
    return Math.random().toString(36).substring(2, 7)
  }

  function updateContactInput(event: React.ChangeEvent<HTMLInputElement>) {
    setContact({
      ...contact,
      [event?.target?.name]: event?.target?.value,
    })
  }

  function isValidContact() {
    if (!contact.name) return false
    if (!contact.email) return false
    return true
  }

  function submit({ id, name, email }: Contact) {
    if (isValidContact()) {
      if (isUpdateContact) {
        dispatch({
          type: 'contact/updateContact',
          payload: {
            id,
            name,
            email,
          },
        })
      } else {
        dispatch({
          type: 'contact/createContact',
          payload: {
            id: getRandomId(),
            name,
            email,
          },
        })
      }
      setIsDialogOpened(false)
    }
  }

  return (
    <Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdateContact ? 'Update Contact' : 'Create Contact'}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={contact?.name}
          onChange={event => updateContactInput(event)}
        ></Input>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={contact?.email}
          onChange={event => updateContactInput(event)}
        ></Input>
        <DialogFooter>
          <Button type="submit" onClick={() => submit(contact)}>
            {isUpdateContact ? 'Update' : 'Create'}
          </Button>
          <Button variant="secondary" onClick={() => setIsDialogOpened(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
