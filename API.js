export const randomUser = async () =>  {
    try {
        const url = 'https://randomuser.me/api/';

        const response = await fetch(url);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error)
    }
};