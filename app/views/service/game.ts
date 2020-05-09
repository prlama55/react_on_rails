import axios from '../utils/axios';
import { AxiosResponse } from 'axios';
import { IScore } from '../components/Game';


export function initializeBoard(): Promise<Array<Array<string>>> {
    return axios.get('/').then((response: AxiosResponse) => {
        return response.data
    })
}

export function submitWord(board, word): Promise<IScore> {
    return axios.request({
        url: '/',
        method: 'POST',
        data: {
            board,
            word: word.toUpperCase()
        }
    }).then((response: AxiosResponse) => {
        return response.data
    })
}


export function initializeGame(): Promise<any> {
    return axios.get('/new').then((response: AxiosResponse) => {
        return response.data
    })
}
