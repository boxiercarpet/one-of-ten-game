import { useNavigate } from "react-router-dom";
import { Game } from "../../types";
import Modal from "../Modal";
import { useDeleteGameMutation } from "../../api/game";

function DeleteGameModal({
    game,
    setIsOpen,
}: {
    game: Game;
    setIsOpen: (isOpen: boolean) => void;
}) {
    const [deleteGame] = useDeleteGameMutation();
    const navigate = useNavigate();

    async function handleDelete() {
        await deleteGame(game.id);
        setIsOpen(false);
        navigate("/dashboard", { replace: true });
    }

    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-3 w-72 font-semibold select-none">
                <div className="text-xl font-semibold text-center">
                    Are you sure you want to delete {game.title}?
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="uppercase font-bold bg-slate-600/20 hover:bg-slate-600/40 py-2 rounded-md select-none flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="uppercase font-bold bg-red-500/30 hover:bg-red-500/80 py-2 rounded-md select-none flex-1"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteGameModal;
