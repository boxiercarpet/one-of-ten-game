import { FaPen } from "react-icons/fa6";
import Modal, { ModalProps } from "../../Modal";
import { useForm } from "react-hook-form";

function CreateGameModal({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) {
    const { register, handleSubmit } = useForm<{ title: string }>();

    const onSubmit = (data: { title: string }) => {
        console.log(data);
    };

    return (
        <Modal setIsOpen={setIsOpen}>
            <form
                className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-3 w-72 font-semibold select-none"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-xl text-center">Creating New Game</div>
                <label className="bg-slate-400/40 flex items-center rounded-md pl-3 gap-1">
                    <FaPen />
                    <input
                        type="text"
                        className="bg-transparent flex-1 p-2 outline-none border-none select-none"
                        placeholder="title"
                        {...register("title", { required: true })}
                    />
                </label>
                <button
                    type="submit"
                    className="uppercase font-bold bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md select-none"
                >
                    Create
                </button>
            </form>
        </Modal>
    );
}

export default CreateGameModal;
