import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db-utils';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const db = readDb();
        const user = db.users.find((u: any) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
