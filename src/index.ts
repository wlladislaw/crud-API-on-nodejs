import http from 'http';

import dotenv from 'dotenv';
import { defaultHandler, postHandler, getHandler } from './controller.ts';

dotenv.config();
const PORT = process.env.PORT || 9000;

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case 'GET': {
            if (reqURL === '/') {
                response.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                response.write(
                    JSON.stringify({
                        message: 'GET Succesfull on NODE API',
                    })
                );
                response.end();
            }
            if (reqURL === '/users') {
                getHandler(request, response);
            }
            defaultHandler(request, response);
            response.end();
            break;
        }
        case 'POST': {
            if (reqURL === '/users') {
                postHandler(request, response);
            }
            defaultHandler(request, response);
            response.end();
            break;
        }
        default: {
            defaultHandler(request, response);
            response.end();
        }
    }
});
server.listen(PORT, () => {
    console.log(`Server start and listen on ${PORT}`);
});
