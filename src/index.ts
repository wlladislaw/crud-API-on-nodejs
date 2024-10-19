import http from 'http';

import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 9000;

const server = http.createServer();
server.listen(PORT, () => {
    console.log(`Server start and listen on ${PORT}`);
});
