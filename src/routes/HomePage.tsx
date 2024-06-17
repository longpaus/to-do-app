import {Navigate} from "react-router-dom";

export default function HomePage() {


  return (
    <>
      <Navigate to="/register" replace={true}/>
    </>
  )
}