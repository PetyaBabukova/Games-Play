import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments'; // The url after migration

export const getAll = async (gameId)=>{
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `owner=_ownerId:users`
    })

    
    // const result = await request.get(baseUrl); //over fatching! Before migration
    // // return Object.values(result);
    // return Object.values(result).filter(comment => comment.gameId===gameId) //over fatching!

    const result = await request.get(`${baseUrl}?${query}`);
    return result;
};

export const create = async (gameId, username, text) => {
    const newComment = await request.post(baseUrl, {
        gameId,
        text
    });

    return newComment;
};