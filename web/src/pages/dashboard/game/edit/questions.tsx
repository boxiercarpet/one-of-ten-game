import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useGetGameQuestionsQuery } from "../../../../api/game";
import Loading from "../../../../components/Loading";
import QuestionElement from "../../../../components/dashboard/Question";
import { useState } from "react";
import { Portal } from "@mui/material";
import CreateQuestionModal from "../../../../components/modals/CreateQuestion";

function GameEditQuestionsPage() {
    const params = useParams<{ gameId: string }>();
    if (!params.gameId) return null;
    const { data } = useGetGameQuestionsQuery(params.gameId);
    const [createModal, setCreateModal] = useState(false);

    return (
        <>
            {createModal && (
                <Portal>
                    <CreateQuestionModal setIsOpen={setCreateModal} />
                </Portal>
            )}
            <div className="flex justify-between select-none">
                <div>Questions</div>
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
                {data?.map((question) => (
                    <QuestionElement key={question.id} question={question} />
                ))}
                {data?.length === 0 && (
                    <div className="text-center text-sm text-slate-400 select-none">
                        YOU DON'T HAVE ANY QUESTION
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

export default GameEditQuestionsPage;
