import { FaPenToSquare } from "react-icons/fa6";
import { Game } from "../../types";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteGameModal from "../modals/DeleteGame";
import { Portal } from "@mui/material";

function GameElement({ game }: { game: Game }) {
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <div className="flex items-center justify-between p-2 pl-3 pr-4 gap-3 bg-slate-600/20 rounded-md text-xl">
            {deleteModal && (
                <Portal>
                    <DeleteGameModal setIsOpen={setDeleteModal} game={game} />
                </Portal>
            )}
            <Link to={`/dashboard/${game.id}`} className="flex-1">
                {game.title}
            </Link>
            <Link
                to={`/dashboard/${game.id}/edit`}
                className="text-white hover:text-slate-200 text-base"
            >
                <FaPenToSquare />
            </Link>
            <div
                className="cursor-pointer text-red-500 hover:text-red-600 text-base"
                onClick={() => setDeleteModal(true)}
            >
                <FaTrashAlt />
            </div>
        </div>
    );
}

export default GameElement;
