import {
    Link,
    Navigate,
    Route,
    Routes,
    useLocation,
    useParams,
} from "react-router-dom";
import GameEditTeamsPage from "./teams";
import GameEditQuestionsPage from "./questions";
import { useGetGameQuery } from "../../../../api/game";
import { FaHome, FaTrashAlt } from "react-icons/fa";
import {
    FaDesktop,
    FaPenToSquare,
    FaQuestion,
    FaShareNodes,
    FaUserGroup,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import DeleteGameModal from "../../../../components/modals/DeleteGame";
import ChangeGameTitleModal from "../../../../components/modals/ChangeGameTitle";

function GameEditPage() {
    const location = useLocation();
    const [deleteModal, setDeleteModal] = useState(false);
    const [changeTitleModal, setChangeTitleModal] = useState(false);
    const params = useParams<{ gameId: string }>();
    if (!params.gameId) return null;
    const { data } = useGetGameQuery(params.gameId);

    return (
        <div className="min-h-screen flex justify-center items-center">
            {deleteModal && data && (
                <DeleteGameModal setIsOpen={setDeleteModal} game={data} />
            )}
            {changeTitleModal && data && (
                <ChangeGameTitleModal
                    setIsOpen={setChangeTitleModal}
                    game={data}
                />
            )}

            <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2 select-none">
                    <div className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-2xl gap-2 w-72 font-semibold">
                        {data?.title}
                    </div>
                    <div className="flex flex-col p-2 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-1 w-72 font-semibold">
                        <Link
                            to="teams"
                            className="flex items-center gap-2 cursor-pointer hover:text-slate-300 relative p-2 px-3"
                        >
                            {location.pathname.includes("teams") && (
                                <motion.div
                                    layoutId="game-edit-current-page"
                                    className="rounded-md bg-slate-600/20 absolute inset-0"
                                ></motion.div>
                            )}
                            <FaUserGroup />
                            <div>Teams</div>
                        </Link>
                        <Link
                            to="questions"
                            className="flex items-center gap-2 cursor-pointer hover:text-slate-300 relative p-2 px-3"
                        >
                            {location.pathname.includes("questions") && (
                                <motion.div
                                    layoutId="game-edit-current-page"
                                    className="rounded-md bg-slate-600/20 absolute inset-0"
                                ></motion.div>
                            )}
                            <FaQuestion />
                            <div>Questions</div>
                        </Link>
                    </div>
                    <div className="flex flex-col p-4 px-2 pt-3 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-2 w-72 font-semibold">
                        <Link
                            to={"/dashboard"}
                            className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 flex-1 p-1 rounded-md"
                        >
                            <FaHome />
                            <div>Dashboard</div>
                        </Link>
                        <div className="flex gap-2 mb-1">
                            <Link
                                to={"../"}
                                className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 flex-1 p-1 rounded-md"
                            >
                                <FaDesktop />
                                <div>Manage</div>
                            </Link>
                            <div className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 flex-1 p-1 rounded-md">
                                <FaShareNodes />
                                <div>Audience</div>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:text-slate-300 px-3"
                            onClick={() => setChangeTitleModal(true)}
                        >
                            <FaPenToSquare />
                            <div>Change Title</div>
                        </div>
                        <div
                            className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600 px-3"
                            onClick={() => setDeleteModal(true)}
                        >
                            <FaTrashAlt />
                            <div>Delete</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-2xl w-[32rem] font-semibold h-[32rem]">
                    <Routes>
                        <Route path="/teams" element={<GameEditTeamsPage />} />
                        <Route
                            path="/questions"
                            element={<GameEditQuestionsPage />}
                        />
                        <Route path="*" element={<Navigate to="teams" />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default GameEditPage;
