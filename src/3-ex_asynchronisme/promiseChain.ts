import axios, { AxiosError } from 'axios';

interface Body {
    time: string,
    sentence: string
}

interface Error {
    error: string
}

function Get(): Promise<Body | Error> {
    return new Promise<Body | Error>((resolve, reject) => {
        axios.get<Body>(
            'https://esgiprofnodexnk988qs-node-test-api.functions.fnc.fr-par.scw.cloud/api/v1/random-delay?start=1&end=8'
        )
        .then((response) => {
            resolve(response.data);
        })
        .catch((e: AxiosError<Error>) => reject(e.response));
    });
}

export { Get, Body, Error }