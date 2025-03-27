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
  contactIndex: number | null
  isDialogOpened: boolean
  setIsDialogOpened: (isDialogOpened: boolean) => void
}

export default function CreateContactDialog({
  contactIndex,
  isDialogOpened,
  setIsDialogOpened,
}: createContactDialogProps) {
  const contacts = useAppSelector(state => state.contacts.contacts)
  const dispatch = useAppDispatch()
  const [contact, setContact] = useState<Contact>({ name: '', email: '' })
  const isUpdateContact = Boolean(contactIndex !== null)

  useEffect(() => {
    if (isDialogOpened) {
      if (contactIndex === null) {
        setContact({ name: '', email: '' })
      } else {
        setContact(contacts[contactIndex])
      }
    }
  }, [isDialogOpened])

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

  function submit({ name, email }: Contact) {
    if (isValidContact()) {
      if (isUpdateContact) {
        dispatch({
          type: 'contact/updateContact',
          payload: {
            index: contactIndex,
            name,
            email,
          },
        })
      } else {
        dispatch({
          type: 'contact/createContact',
          payload: {
            name,
            email,
          },
        })
      }
      setIsDialogOpened(false)
    }
  }

  return (
    <Dialog open={isDialogOpened}>
      <DialogContent onEscapeKeyDown={() => setIsDialogOpened(false)}>
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
