export default {
    badRequest: () => {
        return {
            status: 400,
            text: { message: 'Bad request' }
        };
    },
    forbidden: () => {
        return {
            status: 403,
            text: { message: 'Forbidden' }
        };
    },
    notFound: () => {
        return {
            status: 404,
            text: { message: 'Not found' }
        };
    },
    unprocessable: () => {
        return {
            status: 422,
            text: { message: 'Unprocessable entity' }
        };
    },
    serverErr: () => {
        return {
            status: 500,
            text: { message: 'Something went wrong' }
        };
    }
};
