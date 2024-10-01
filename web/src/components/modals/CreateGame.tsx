import { FaPen } from "react-icons/fa6";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { useCreateGameMutation } from "../../api/game";
import { useNavigate } from "react-router-dom";

function CreateGameModal({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<{ title: string }>();
    const [createGame] = useCreateGameMutation();

    const onSubmit = async (data: { title: string }) => {
        const result = await createGame(data);
        if (result?.data) {
            setIsOpen(false);
            navigate(`/dashboard/${result.data.id}/edit`);
        }
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
                        autoFocus
                        className="bg-transparent flex-1 p-2 outline-none border-none select-none"
                        placeholder="Title"
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
