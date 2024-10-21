import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/index';
import { usersDB } from '../db/users';

let users = usersDB;
export const getUsers = (): User[] => users;

export const getUserByUUId = (id: string): User | undefined =>
    users.find((user) => user.id === id);

export const createUser = (
    username: string,
    age: number,
    hobbies: string[]
): User => {
    const newUser: User = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    return newUser;
};

export const updateUser = (
    id: string,
    username: string,
    age: number,
    hobbies: string[]
): User | undefined => {
    const user = users.find((user) => user.id === id);
    if (!user) return undefined;

    Object.assign(user, { username, age, hobbies });
    return user;
};

export const deleteUser = (id: string): boolean => {
    const db = users.length;

    users = users.filter((user) => user.id !== id);
    return users.length < db;
};
