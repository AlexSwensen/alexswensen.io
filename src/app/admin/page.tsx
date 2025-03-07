import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }
  return <div>Admin Page</div>;
}
