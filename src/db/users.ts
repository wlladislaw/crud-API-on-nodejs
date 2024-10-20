export interface User {
    id: string;
    username: string;
    age: number;
    hobbies?: string[];
}

export let users: User[] = [
    { id: '1', username: 'Kot', age: 23, hobbies: ['squash'] },
    { id: '2', username: 'Alli', age: 31 },
];
