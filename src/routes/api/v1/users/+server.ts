import { db } from '$lib/db/db.server';
import { userTable } from '$lib/db/schema/users';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	// sort posts by date
	// const userList = await db.select().from(users);
	const userList = await db.query.users.findMany();
	return json({ users: userList });
};
