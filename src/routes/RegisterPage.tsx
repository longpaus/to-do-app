import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {IRegisterFormInput} from "../types/Forms";
import {useMutation} from "@tanstack/react-query";
import {signUpUser} from "../utils/api/formsApi";
import {RegisterUserDTO} from "../types/Dto/RegisterUserDTO";
import {UserDTO} from "../types/Dto/UserDTO";
import {useStore} from "../store";
import {useState} from "react";
import {Link} from "@mui/material";


export default function RegisterPage() {
    const {register, handleSubmit} = useForm<IRegisterFormInput>();
    const navigate = useNavigate();
    const store = useStore();
    const [error, setError] = useState("");

    const mutation = useMutation({
        mutationFn: signUpUser,
        onSuccess: (data: UserDTO) => {
            store.upDateUserId(data.id);
            navigate('/tasks', {replace: true});
        },
        onError: (err: any) => {
            setError(err['response'].data);
        },
        mutationKey: ["register-user"]
    })
    const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
        if (data.password !== data.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        const dto: RegisterUserDTO = {
            password: data.password,
            username: data.username,
        }
        mutation.mutate(dto);
    }

    return (

        <div
            className="flex relative justify-center items-center h-screen flex-col text-black dark:text-darkOnSurface sm:w-100">
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className="flex w-[30rem] flex-col space-y-10">
                    <div className="text-center text-4xl font-medium">Sign Up</div>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input type="text" placeholder="Username"
                               className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                               {...register("username", {required: true})}
                        />
                    </div>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input type="password" placeholder="Password"
                               className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                               {...register("password", {required: true})}
                        />
                    </div>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input type="password" placeholder="Confirm Password"
                               className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                               {...register("confirmPassword", {required: true})}
                        />
                    </div>
                    {error !== "" &&
                        <div
                            className="bg-red-200 px-6 py-4 w-full my-4 rounded-md text-lg flex items-center max-w-lg">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                                </path>
                            </svg>
                            <span className="text-red-800">{error}</span>
                        </div>
                    }

                    <button
                        type="submit"
                        className="transform rounded-sm bg-primary py-2 font-bold duration-300 hover:bg-purple-300 dark:hover:bg-purple-500 focus:ring-4 focus:outline-none"
                    >
                        Sign Up
                    </button>


                    <p className="text-center text-lg">
                        Already Have An Account?
                        <Link href="/login">Log In</Link>
                    </p>
                </section>
            </form>
        </div>
    );
}

