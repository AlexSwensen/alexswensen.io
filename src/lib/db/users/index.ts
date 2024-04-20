import { eq } from 'drizzle-orm';
import { db } from '../db.server';
import { userTable } from '../schema/users';

export const getUserByEmail = async (email: string) => {
	return await db.select().from(userTable).where(eq(userTable.email, email));
};

export const getUserById = async (id: string) => {
	return await db.select().from(userTable).where(eq(userTable.id, id));
};

export const userExists = async (email: string) => {
	const user = await getUserByEmail(email);
	return user.length > 0;
};
