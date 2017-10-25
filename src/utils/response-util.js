export default {
    notFound: () => {
        return {
            status: 404,
            text: { message: 'Not found' }
        }
    },
    serverErr: () => {
        return {
            status: 500,
            text: { message: 'Something went wrong' }
        }
    }
};
