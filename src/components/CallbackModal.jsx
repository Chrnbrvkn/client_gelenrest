import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import '../assets/styles/modal.css'
import CallbackForm from './CallbackForm';
import closedIcon from '../assets/images/icons/menu-closed.svg'

export default function CallbackModal({isOpen, setIsOpen}) {

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <div className="modal__bg" onClick={() => setIsOpen(false)}>
          <div className="callback-modal" onClick={(e) => e.stopPropagation()}>
            <button className='modal__btn-close' onClick={() => setIsOpen(false)}>
              <img src={closedIcon} alt="close" className="close__modal" />
            </button>
            <CallbackForm setIsOpen={setIsOpen} />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}