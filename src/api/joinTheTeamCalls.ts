import axios from 'axios';
import { IRegisteredUsers } from '../interfaces/users';

  export function getRegisteredUsers(): Promise<IRegisteredUsers> {
    return axios.get<IRegisteredUsers>('https://run.mocky.io/v3/9118e647-e131-43c7-8668-d99af1abb5a6')
    .then(response => {
    return response.data;
    })
    .catch(error => {
    console.error(error);
    return { team: [] };
    });
    }
