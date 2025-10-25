import { useRef } from "react"

export default function Modal({btnLabel, children, btnClassName, disabled = false}) {

    const modalRef = useRef();

    function openModal() {
        if (!disabled) {
            modalRef.current.showModal();
        }
    }

    return (
        <>
            <button 
                onClick={openModal} 
                className={btnClassName}
                disabled={disabled}
            >{btnLabel}</button>
            <dialog ref={modalRef} closedby="any">
                {children}
            </dialog>
        </>
    )
}