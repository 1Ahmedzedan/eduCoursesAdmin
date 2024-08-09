import { cloneElement } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useClickOutSideModel } from '../../hooks/useClickOutSideModel'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styles from './Modal.module.css'

const ModalContext = createContext()

function Modal({ children }) {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = (name) => {
    setOpenName(name)
  }

  return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext)
  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext)
  const ref = useClickOutSideModel(close)

  if (name !== openName) return null

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <button className={styles.closeButton} onClick={close}>
          <HiXMark className={styles.closeIcon} />
        </button>
        <div>{cloneElement(children, { onClose: close })}</div>
      </div>
    </div>,
    document.body,
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
