# ProtonNote

Installation / Commands:
This project is a CRA (create-react-app) bootstrap. No project configuration has been altered.

Hello ProtonMail Reviewer :)

I wanted to leave a quick message here to explain something about the encryption / decryption caching behaviour.

In the requirements for this project it stated that the content of a note should be encrypted when the note is saved (I am making the assumption that this means that it should be encrypted where it is being stored).

It is not necessary to encrypt and decrypt a note that has just been modified or added during one un-interrupted runtime of the application since the content is modified or added in its un-encrypted form and we therefore already know what it is.

The way this application behaves is this:
- On bootup notes are loaded into the app from localStorage in their encrypted form
- On selection of any particular note the encryption of its contents begins
- Once a note has already been decrypted during the same un-interrupted runtime, its decrypted contents are cached and the note is not decrypted again on subsequent visits (indicated by the lock)
- On modification of a note, instead of encrypting then decrypting the contents again, the decrypted contents are updated directly with the new content and the new content is also being saved to localStorage in its encrypted format. Modification is interchangeable with Creation in this context.
