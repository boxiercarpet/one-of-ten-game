import { useParams } from "react-router-dom";
import { useGetGameQuery } from "../api/game";
import { FaHeart } from "react-icons/fa6";

function AudiencePage() {
    const params = useParams<{
        gameId: string;
    }>();
    if (!params.gameId) return null;
    const { data } = useGetGameQuery(params.gameId);

    return (
        <div className="min-h-screen flex justify-center items-center text-white">
            {data &&
                data.teams.map((team) => (
                    <div
                        key={team.id}
                        className="flex flex-col items-center text-3xl"
                    >
                        <div
                            className={
                                "font-semibold " +
                                (team.id == data?.currentTeamId
                                    ? "text-indigo-600"
                                    : "")
                            }
                        >
                            {team.name}
                        </div>
                        <div className="text-8xl">{team.score}</div>
                        <div className="flex gap-1 mt-3 text-3xl items-center">
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
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default AudiencePage;
