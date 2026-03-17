import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db-utils';

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const db = readDb();
        
        if (db.users.find((u: any) => u.email === email)) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const newUser = {
            id: Date.now().toString(),
            email,
            password, // In real life, we would hash this
            name,
            address: '',
            orderHistory: []
        };

        db.users.push(newUser);
        writeDb(db);

        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
