import http from 'http';

import dotenv from 'dotenv';
import {
    defaultHandler,
    postHandler,
    getHandler,
    putHandler,
    deleteHandler,
} from './controller.ts';

dotenv.config();
const PORT = process.env.PORT || 9777;

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;

    switch (reqMethod) {
        case 'GET': {
            getHandler(request, response);
            break;
        }
        case 'POST': {
            if (reqURL === '/users') {
                postHandler(request, response);
            } else {
                defaultHandler(request, response);
            }

            break;
        }
        case 'PUT': {
            putHandler(request, response);
            break;
        }
        case 'DELETE': {
            deleteHandler(request, response);
            break;
        }
        default: {
            defaultHandler(request, response);
        }
    }
});
server.listen(PORT, () => {
    console.log(`Server start and listen on ${PORT}`);
});
