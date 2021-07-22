const path = require('path');
const express = require('express');
const chalk = require('chalk');
const { json } = require('body-parser');
const router = require('./router');
const db = require('./db');

const log = console.log;

const main = async () => {
    require('dotenv').config();
    const app = express();
    app.use(json());
    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use('/api', router);

    const shutdown = async () => {
        log(chalk.green(`Shutting down server gracefully`));
        server.close();
    };

    const server = app.listen(process.env.PORT, process.env.HOST, () => {
        log(
            chalk.green(
                `Server started at http://${process.env.HOST}:${process.env.PORT}`
            )
        );
    });

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
};

if (require.main === module) {
    main();
}
