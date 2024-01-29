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
              {/* <img src={closedIcon} alt="close" className="close__modal" /> */}
              <svg alt="close" className="close__modal" width="64" height="64" viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg">
<path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"/>
</svg>
            </button>
            <CallbackForm setIsOpen={setIsOpen} />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}