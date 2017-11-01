const cfg = {
    dev: {
        DATABASE: 'mongodb://localhost:27017/mws-dev',
        JWT: {
            SECRET: 'super-secret',
            EXPIRATION: '1h'
        },
        MAILGUN: {
            API_KEY: process.env.MG_API_KEY,
            DOMAIN: process.env.MG_DOMAIN
        },
        PORT: 3000
    },
    prod: {
        DATABASE: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds229435.mlab.com:29435/mws`,
        JWT: {
            SECRET: process.env.JWT_SECRET,
            EXPIRATION: '1h'
        },
        MAILGUN: {
            API_KEY: process.env.MG_API_KEY,
            DOMAIN: process.env.MG_DOMAIN
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
