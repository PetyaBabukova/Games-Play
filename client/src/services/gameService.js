const baseUrl = 'https://localhost:3030/jsonstore/games'

export const create = async(gameData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(gameData)
    });

    const result = response.json()

    return result;
}