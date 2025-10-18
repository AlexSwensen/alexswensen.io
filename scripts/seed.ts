const msg: string = `Seeding the database...`;

console.log(msg);
// import { db } from '../src/db';
// import { users } from '../src/db/schema';
// import { v4 as uuidv4 } from 'uuid';
// import bcrypt from 'bcryptjs';

// async function seed() {
//   const hashedPassword = await bcrypt.hash('password123', 10);

//   await db.insert(users).values([
//     {
//       id: uuidv4(),
//       email: 'user@email.co',
//       firstName: 'John',
//       lastName: 'Doe',
//       hashedPassword,
//     },
//   ]);

//   console.log('Seeding completed.');
// }

// seed().catch((error) => {
//   console.error('Error seeding the database:', error);
// });
