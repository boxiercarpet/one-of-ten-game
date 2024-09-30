export type ModalProps = {
    children: React.ReactNode;
    setIsOpen: (isOpen: boolean) => void;
};

function Modal({ children, setIsOpen }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-40">
            <div className="z-50">{children}</div>
            <div
                className="fixed inset-0 cursor-pointer"
                onClick={() => setIsOpen(false)}
            />
        </div>
    );
}

export default Modal;
