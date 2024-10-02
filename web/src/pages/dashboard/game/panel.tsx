import { FaArrowCircleDown, FaHome } from "react-icons/fa";
import {
    FaHeart,
    FaMinus,
    FaPenToSquare,
    FaPlus,
    FaRotate,
} from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import {
    useGetGameQuery,
    useRollQuestionMutation,
    useRollTeamMutation,
} from "../../../api/game";
import { useUpdateTeamMutation } from "../../../api/team";

function GamePanelPage() {
    const params = useParams<{ gameId: string }>();
    if (!params.gameId) return null;
    const { data } = useGetGameQuery(params.gameId, {
        refetchOnFocus: true,
    });
    const [rollQuestion] = useRollQuestionMutation();
    const [rollTeam] = useRollTeamMutation();
    const [updateTeam] = useUpdateTeamMutation();

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Link
                        to="/dashboard"
                        className="flex items-center justify-center cursor-pointer p-4 bg-slate-600/10 hover:text-slate-300 backdrop-blur-xl rounded-lg text-white text-xl gap-2 aspect-square font-semibold"
                    >
                        <FaHome />
                    </Link>
                    <div className="flex flex-col p-3 px-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-xl gap-2 flex-1 font-semibold">
                        {data?.title}
                    </div>
                    <Link
                        to={`/dashboard/${params.gameId}/edit`}
                        className="flex items-center justify-center cursor-pointer p-4 bg-slate-600/10 hover:text-slate-300 backdrop-blur-xl rounded-lg text-white text-lg gap-2 aspect-square font-semibold"
                    >
                        <FaPenToSquare />
                    </Link>
                </div>
                <div className="flex flex-wrap justify-evenly p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-xl gap-2 flex-1 w-[95vw] max-w-[800px] font-semibold">
                    {data?.teams.map((team) => (
                        <div
                            key={team.id}
                            className="flex flex-col items-center text-3xl"
                        >
                            <div
                                className={
                                    team.id == data?.currentTeamId
                                        ? "text-indigo-600"
                                        : ""
                                }
                            >
                                {team.name}
                            </div>
                            <div className="text-8xl">{team.score}</div>
                            <div className="flex gap-1 mt-3 text-3xl items-center">
                                <div
                                    className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 p-2 rounded-md text-base"
                                    onClick={() =>
                                        team.lives > 0 &&
                                        updateTeam({
                                            id: team.id,
                                            data: { lives: team.lives - 1 },
                                        })
                                    }
                                >
                                    <FaMinus />
                                </div>
                                <div className="w-40 flex gap-1 justify-center">
                                    {Array(team.lives)
                                        .fill(0)
                                        .map((_, i) => (
                                            <FaHeart
                                                key={i}
                                                className="text-red-500"
                                            />
                                        ))}
                                </div>
                                <div
                                    className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 p-2 rounded-md text-base"
                                    onClick={() =>
                                        team.lives < 5 &&
                                        updateTeam({
                                            id: team.id,
                                            data: { lives: team.lives + 1 },
                                        })
                                    }
                                >
                                    <FaPlus />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col p-2 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-xl flex-1 font-semibold h-fit w-fit">
                        <div className="flex justify-between items-center select-none">
                            <div className="px-2">Current Question</div>
                            <div
                                className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 p-2 rounded-md"
                                onClick={() => rollQuestion(params.gameId!)}
                            >
                                <FaRotate />
                            </div>
                        </div>
                        {data?.currentQuestion ? (
                            <div className="flex flex-col p-2 pl-3 pr-4 bg-slate-600/20 rounded-md text-xl mt-2">
                                <div>{data.currentQuestion.content}</div>
                                <div className="text-slate-400 text-base">
                                    {data.currentQuestion.answer}
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 pt-0 text-slate-400">
                                No question
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col p-2 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white text-xl flex-1 font-semibold h-fit w-0 select-none">
                        <div className="flex justify-between items-center">
                            <div className="px-2">Current Team</div>
                            <div
                                className="flex justify-center items-center gap-2 cursor-pointer hover:text-slate-300 bg-slate-600/20 p-2 rounded-md"
                                onClick={() => rollTeam(params.gameId!)}
                            >
                                <FaRotate />
                            </div>
                        </div>
                        <div className="p-2 pt-0 text-slate-400">
                            {data?.currentTeam?.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePanelPage;
