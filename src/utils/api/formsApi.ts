import axios from "axios";
import {BACKEND_URL} from "../../Configuration";
import {UserFormDTO} from "../../types/Dto/UserFormDTO";
import {UserDTO} from "../../types/Dto/UserDTO";

export const signUpUser = async (dto: UserFormDTO): Promise<UserDTO> => {
    const response = await axios.post<UserDTO>(`${BACKEND_URL}/user/create`, dto);
    return response.data;
}

export const signInUser = async (dto: UserFormDTO): Promise<UserDTO> => {
    const response = await axios.post<UserDTO>(`${BACKEND_URL}/user/login`, dto);
    return response.data;
}