import { users } from 'db/users';
import { IncomingMessage, ServerResponse } from 'http';
export const defaultHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => {
    response.writeHead(200, {
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
    const data = users;
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

        response.writeHead(200, {
            'Content-Type': 'application/json',
        });
        response.write(
            JSON.stringify({
                message: 'POST succesfull',
                data: objData,
            })
        );
        response.end();
    });
};
