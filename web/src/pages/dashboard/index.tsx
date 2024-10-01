import { FaArrowRightFromBracket, FaKey, FaPlus } from "react-icons/fa6";
import { useMeQuery } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/auth";
import { useState } from "react";
import CreateGameModal from "../../components/modals/CreateGame";
import { useGetGamesQuery } from "../../api/game";
import Loading from "../../components/Loading";
import GameElement from "../../components/dashboard/Game";

function DashboardPage() {
    const dispatch = useDispatch();
    const { data: me } = useMeQuery();
    const { data: games } = useGetGamesQuery();
    const [createModal, setCreateModal] = useState(false);

    return (
        <div className="min-h-screen flex justify-center items-center">
            {createModal && <CreateGameModal setIsOpen={setCreateModal} />}
            <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2 select-none">
                    <div className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-2xl gap-2 w-72 font-semibold">
                        Hi, {me?.username}
                    </div>
                    <div className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-2 w-72 font-semibold">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-slate-300">
                            <FaKey />
                            <div>Change Password</div>
                        </div>
                        <div
                            className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600"
                            onClick={() => dispatch(setToken(null))}
                        >
                            <FaArrowRightFromBracket />
                            <div>Logout</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-2xl w-[32rem] font-semibold h-[32rem]">
                    <div className="flex justify-between select-none">
                        <div>Your Games</div>
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
                        {games?.map((game) => (
                            <GameElement key={game.id} game={game} />
                        ))}
                        {games?.length === 0 && (
                            <div className="text-center text-sm text-slate-400 select-none">
                                YOU DON'T HAVE ANY GAME
                            </div>
                        )}
                        {!games && (
                            <div className="flex-1 w-full">
                                <Loading />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
