import { FaPenToSquare } from "react-icons/fa6";
import { Team } from "../../types";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Portal } from "@mui/material";
import DeleteTeamModal from "../modals/DeleteTeam";

function TeamElement({ team }: { team: Team }) {
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <div className="flex items-center justify-between p-2 pl-3 pr-4 gap-3 bg-slate-600/20 rounded-md text-xl">
            {deleteModal && (
                <Portal>
                    <DeleteTeamModal setIsOpen={setDeleteModal} team={team} />
                </Portal>
            )}
            <div className="flex-1">{team.name}</div>
            <div className="text-white hover:text-slate-200 text-base">
                <FaPenToSquare />
            </div>
            <div
                className="cursor-pointer text-red-500 hover:text-red-600 text-base"
                onClick={() => setDeleteModal(true)}
            >
                <FaTrashAlt />
            </div>
        </div>
    );
}

export default TeamElement;
