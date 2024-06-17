import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

interface IRegisterFormInput {
    username: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const {register, handleSubmit} = useForm<IRegisterFormInput>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
        console.log(data);
        navigate("/tasks", {replace: true});
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
                    <button
                        type="submit"
                        className="transform rounded-sm bg-primary py-2 font-bold duration-300 hover:bg-purple-300 dark:hover:bg-purple-500 focus:ring-4 focus:outline-none"
                    >
                        Sign Up
                    </button>


                    <p className="text-center text-lg">
                        Already Have An Account?
                        <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline">Log
                            In</a>
                    </p>
                </section>
            </form>
        </div>
    );
}

