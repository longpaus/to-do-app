import {Navigate} from "react-router-dom";
import {useStore} from "../store";

export default function HomePage() {
    const store = useStore();

    return (
        <>
            {store.userId ?
                <Navigate to="/tasks"/> :
                <Navigate to="/login"/>
            }
        </>
    )
}