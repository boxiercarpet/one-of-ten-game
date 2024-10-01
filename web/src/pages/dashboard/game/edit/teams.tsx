import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useGetGameTeamsQuery } from "../../../../api/game";
import Loading from "../../../../components/Loading";
import { useState } from "react";
import CreateTeamModal from "../../../../components/modals/CreateTeam";
import { Portal } from "@mui/material";
import TeamElement from "../../../../components/dashboard/Team";

function GameEditTeamsPage() {
    const params = useParams<{ gameId: string }>();
    if (!params.gameId) return null;
    const { data } = useGetGameTeamsQuery(params.gameId);
    const [createModal, setCreateModal] = useState(false);

    return (
        <>
            {createModal && (
                <Portal>
                    <CreateTeamModal setIsOpen={setCreateModal} />
                </Portal>
            )}
            <div className="flex justify-between select-none">
                <div>Teams</div>
                <div
                    className="flex items-center gap-2 p-1 px-3 uppercase text-base bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded-md"
                    onClick={() => setCreateModal(true)}
                >
                    <FaPlus />
                    <div>Create</div>
                </div>
            </div>
            <div className="bg-slate-400/10 h-0.5 rounded-full mt-3 mb-3"></div>
            <div className="flex flex-col gap-2 flex-1 shrink-0 overflow-auto">
                {data?.map((team) => (
                    <TeamElement key={team.id} team={team} />
                ))}
                {data?.length === 0 && (
                    <div className="text-center text-sm text-slate-400 select-none">
                        YOU DON'T HAVE ANY TEAM
                    </div>
                )}
                {!data && (
                    <div className="flex-1 w-full">
                        <Loading />
                    </div>
                )}
            </div>
        </>
    );
}

export default GameEditTeamsPage;
