import { FaTrashAlt } from "react-icons/fa";
import { Question } from "../../types";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import { Portal } from "@mui/material";
import DeleteQuestionModal from "../modals/DeleteQuestion";

function QuestionElement({ question }: { question: Question }) {
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <div className="flex flex-col p-2 pl-3 pr-4 bg-slate-600/20 rounded-md text-xl">
            {deleteModal && (
                <Portal>
                    <DeleteQuestionModal
                        setIsOpen={setDeleteModal}
                        question={question}
                    />
                </Portal>
            )}
            <div className="flex gap-3 items-center">
                <div className="flex-1 w-0 truncate">{question.content}</div>
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
            <div className="text-slate-400 text-base">{question.answer}</div>
        </div>
    );
}

export default QuestionElement;
