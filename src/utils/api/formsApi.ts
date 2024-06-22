import axios from "axios";
import {BACKEND_URL} from "../../Configuration";
import {RegisterUserDTO} from "../../types/Dto/RegisterUserDTO";
import {UserDTO} from "../../types/Dto/UserDTO";

export const signUpUser = async (dto: RegisterUserDTO): Promise<UserDTO> => {
    const response = await axios.post<UserDTO>(`${BACKEND_URL}/user/create`, dto);
    return response.data;
}