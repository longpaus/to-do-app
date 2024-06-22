import {Link} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {ILoginFormInput} from "../types/Forms";
import {UserFormDTO} from "../types/Dto/UserFormDTO";
import {useStore} from "../store";
import {useMutation} from "@tanstack/react-query";
import {signInUser} from "../utils/api/formsApi";
import {UserDTO} from "../types/Dto/UserDTO";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const store = useStore();
    const {register, handleSubmit, setError, formState: {errors}} = useForm<ILoginFormInput>();

    const mutation = useMutation({
        mutationFn: signInUser,
        onSuccess: (data: UserDTO) => {
            store.upDateUserId(data.id);
            navigate('/', {replace: true})
        },
        onError: (err: any) => {
            setError("root.backendError", {
                type: "manual",
                message: err['response'].data
            })
        },
        mutationKey: ["login-user"]
    })
    const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
        const dto: UserFormDTO = {
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
                    <div className="text-center text-4xl font-medium">Log In</div>
                    <div>
                        <div
                            className={`w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ${errors.username ? "border-red-500" : ""}`}>
                            <input type="text" placeholder="Username"
                                   className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                   {...register("username", {required: "Username is required"})}
                            />
                        </div>
                        {errors.username && <div className="text-red-500">{errors.username.message}</div>}
                    </div>


                    <div>
                        <div
                            className={`w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ${errors.password ? "border-red-500" : ""}`}>
                            <input type="password" placeholder="Password"
                                   className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                   {...register("password", {required: "Password is required"})}
                            />
                        </div>
                        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                    </div>
                    {errors.root &&
                        <div
                            className="bg-red-200 px-6 py-4 w-full my-4 rounded-md text-lg flex items-center max-w-lg">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                                </path>
                            </svg>
                            <span className="text-red-800">{errors.root.message}</span>
                        </div>
                    }

                    <button
                        type="submit"
                        className="transform rounded-sm bg-primary py-2 font-bold duration-300 hover:bg-purple-300 dark:hover:bg-purple-500 focus:ring-4 focus:outline-none"
                    >
                        Log In
                    </button>


                    <p className="text-center text-lg">
                        Don't have an account?
                        <Link href="/register">Sign Up</Link>
                    </p>
                </section>
            </form>
        </div>
    );
}