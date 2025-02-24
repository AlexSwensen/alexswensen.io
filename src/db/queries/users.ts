import { db } from '@/db';
import { User, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
export const getUsers = async () => {
  const users = await db.select().from(usersTable);
  return users;
};

export const getUserById = async (id: number) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return user;
};

export const createUser = async (user: Omit<User, 'id'>) => {
  const newUser = await db.insert(usersTable).values(user);
  return newUser;
};

export const deleteUser = async (id: number) => {
  const deletedUser = await db.delete(usersTable).where(eq(usersTable.id, id));
  return deletedUser;
};

export const updateUser = async (id: number, user: Partial<User>) => {
  const updatedUser = await db.update(usersTable).set(user).where(eq(usersTable.id, id));
  return updatedUser;
};

// create a user

// const user = await createUser({
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   age: 25,
// });
