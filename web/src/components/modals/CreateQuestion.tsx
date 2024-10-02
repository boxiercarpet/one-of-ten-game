import { FaCheck, FaQuestion } from "react-icons/fa6";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { useCreateGameQuestionMutation } from "../../api/game";
import { useParams } from "react-router-dom";

function CreateQuestionModal({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) {
    const params = useParams<{ gameId: string }>();
    if (!params.gameId) return null;
    const { register, handleSubmit } = useForm<{
        content: string;
        answer: string;
    }>();
    const [createQuestion] = useCreateGameQuestionMutation();

    const onSubmit = async (data: { content: string; answer: string }) => {
        await createQuestion({
            gameId: params.gameId!,
            data: data,
        });
        setIsOpen(false);
    };

    return (
        <Modal setIsOpen={setIsOpen}>
            <form
                className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-3 w-96 font-semibold select-none"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-xl text-center">Creating New Question</div>
                <label className="bg-slate-400/40 flex items-center rounded-md pl-3 gap-1">
                    <FaQuestion />
                    <input
                        type="text"
                        autoFocus
                        className="bg-transparent flex-1 p-2 outline-none border-none select-none"
                        placeholder="Question"
                        {...register("content", { required: true })}
                    />
                </label>
                <label className="bg-slate-400/40 flex items-center rounded-md pl-3 gap-1">
                    <FaCheck />
                    <input
                        type="text"
                        className="bg-transparent flex-1 p-2 outline-none border-none select-none"
                        placeholder="Answer"
                        {...register("answer", { required: true })}
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

export default CreateQuestionModal;
