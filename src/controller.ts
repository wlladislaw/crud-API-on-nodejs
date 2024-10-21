import {
    getUsers,
    createUser,
    getUserByUUId,
    updateUser,
    deleteUser,
} from './models/User';
import { validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
export const defaultHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => {
    response.writeHead(400, {
        'Content-Type': 'application/json',
    });
    response.write(
        JSON.stringify({
            message: `Not found at ${request.url}`,
        })
    );
    response.statusCode = 400;
    response.end();
};

export const getHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => {
    const reqURL = request.url;

    const userId = reqURL?.split('/')[2];

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
        const data = getUsers();
        response.writeHead(200, {
            'Content-Type': 'application/json',
        });
        response.write(
            JSON.stringify({
                message: 'GET succesfull',
                data,
            })
        );
        response.end();
    } else if (userId) {
        if (!uuidValidate(userId)) {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end(' userId is invalid (not uuid)');
            return;
        }
        const user = getUserByUUId(userId);
        if (!user) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('user not found');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(user));
        return;
    } else {
        defaultHandler(request, response);
    }
};

export const postHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => {
    let chunks: any = [];
    request.on('data', (chunk) => {
        chunks.push(chunk);
    });
    request.on('end', () => {
        const data = Buffer.concat(chunks);

        const stringData = data.toString();
        const parsedData = new URLSearchParams(stringData);

        const objData: any = {};
        for (let key of parsedData.entries()) {
            objData[key[0]] = key[1];
        }

        try {
            const { username, age, hobbies } = objData;

            if (
                !username.trim() ||
                typeof Number(age) !== 'number' ||
                !hobbies.trim() ||
                !age.trim()
            ) {
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.end('request body does not contain required fields');
                return;
            }

            const addedUser = createUser(username, age, new Array(hobbies));
            response.writeHead(201, {
                'Content-Type': 'application/json',
            });
            response.write(
                JSON.stringify({
                    message: 'POST succesfull',
                    data: addedUser,
                })
            );

            response.end();
        } catch (e) {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('invalid request');
        }
        return;
    });
};

export const putHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => {
    const reqURL = request.url;

    const userId = reqURL?.split('/')[2];
    if (userId) {
        if (!uuidValidate(userId)) {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end(' userId is invalid (not uuid)');
            return;
        }
    }

    let chunks: any = [];
    request.on('data', (chunk) => {
        chunks.push(chunk);
    });
    request.on('end', () => {
        const data = Buffer.concat(chunks);

        const stringData = data.toString();
        const parsedData = new URLSearchParams(stringData);

        const objData: any = {};
        for (let key of parsedData.entries()) {
            objData[key[0]] = key[1];
        }

        try {
            const { username, age, hobbies } = objData;

            if (
                !username.trim() ||
                typeof Number(age) !== 'number' ||
                !hobbies.trim() ||
                !age.trim()
            ) {
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.end('request body does not contain required fields');
                return;
            }
            if (userId) {
                const upUser = updateUser(
                    userId,
                    username,
                    age,
                    new Array(hobbies)
                );
                if (!upUser) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('user not found');
                    return;
                }

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(upUser));
            }
            return;
        } catch (e) {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('invalid request');
        }
        return;
    });
};

export const deleteHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => {
    const reqURL = request.url;

    const userId = reqURL?.split('/')[2];
    if (userId) {
        if (!uuidValidate(userId)) {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end(' userId is invalid (not uuid)');
            return;
        }
    }
    if (userId) {
        const res = deleteUser(userId);
        if (!res) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end("id === userId doesn't exist");
            return;
        }

        response.writeHead(204, { 'Content-Type': 'text/plain' });
        response.end('user deleted');
    } else {
        defaultHandler(request, response);
    }
    return;
};
