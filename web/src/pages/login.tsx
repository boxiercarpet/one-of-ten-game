import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/auth";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth";
import { FaKey, FaUser } from "react-icons/fa6";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loginUser, { status, data, error }] = useLoginMutation();
    const [errorText, setErrorText] = useState<string | null>(null);
    const { register, handleSubmit } = useForm<{
        username: string;
        password: string;
        confirm_password: string;
    }>();

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            if (data?.access_token) dispatch(setToken(data.access_token));
            const from = (location.state as any)?.from || "/dashboard";
            navigate(from, {
                replace: true,
            });
        } else if (status === QueryStatus.rejected) {
            setErrorText((error as any).data.message);
        }
    }, [status]);

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <form
                onSubmit={handleSubmit((data) => loginUser(data))}
                className="flex flex-col p-4 bg-slate-600/10 backdrop-blur-xl rounded-lg text-white gap-2 w-72 font-semibold"
            >
                <div className="uppercase font-bold text-2xl text-center py-2 pt-0 select-none">
                    Login
                </div>
                <label className="bg-slate-400/40 flex items-center rounded-md pl-3 gap-1">
                    <FaUser />
                    <input
                        type="text"
                        className="bg-transparent flex-1 p-2 outline-none border-none select-none"
                        placeholder="username"
                        {...register("username", { required: true })}
                    />
                </label>
                <label className="bg-slate-400/40 flex items-center rounded-md pl-3 gap-1">
                    <FaKey />
                    <input
                        type="password"
                        className="bg-transparent flex-1 p-2 outline-none border-none select-none"
                        placeholder="password"
                        {...register("password", { required: true })}
                    />
                </label>
                <div className="min-h-6 flex items-start justify-center">
                    {errorText && <p>{errorText}</p>}
                </div>
                <button
                    type="submit"
                    className="uppercase font-bold bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md select-none"
                >
                    Login
                </button>
                <div className="flex gap-2 items-center">
                    <div className="h-0.5 bg-slate-500 flex-1"></div>
                    <div className="uppercase font-semibold text-slate-100 text-sm">
                        or
                    </div>
                    <div className="h-0.5 bg-slate-500 flex-1"></div>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="uppercase font-bold bg-slate-600 hover:bg-slate-700 py-2 rounded-md select-none"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Login;
