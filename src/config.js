const cfg = {
    dev: {
        DATABASE: 'mongodb://localhost:27017/mws-dev',
        JWT: {
            SECRET: 'super-secret',
            EXPIRATION: '1H'
        },
        PORT: 3000
    },
    prod: {
        DATABASE: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds231715.mlab.com:31715/mws`,
        JWT: {
            SECRET: '0682f007844a0266990df1b2912f95bc',
            EXPIRATION: '1h'
        },
        PORT: process.env.PORT || 8080
    }
};

export default () => {
    switch(process.env.NODE_ENV) {
        case 'production':
            return cfg.prod;
        default:
            return cfg.dev;
    }
};
