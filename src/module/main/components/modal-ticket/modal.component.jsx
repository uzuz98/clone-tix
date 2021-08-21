import React, { useState } from 'react'
import "./modal.style.scss"

export default function Modal() {
    const [modal, setModal] = useState()
    const toggleModal = () => {
        setModal(!modal)
    }
    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")

    }

    return (
        <>
            <button className="btn__modal" onClick={() => toggleModal()}>Open Modal</button>
            {modal && (
                <div className="modal__card">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal__cotent">
                    </div>
                    <button onClick={() => toggleModal()} className="close__modal">Close Modal</button>
                </div>
            )}

        </>
    )
}
