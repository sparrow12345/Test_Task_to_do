import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ITask } from '@/types/tasks';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const newTask = (await req.json()) as ITask;
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
      });
    }

    // console.log(newTask);
    // Validate input
    if (!newTask.name || !newTask.description) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }
    // console.log(session.user.id);

    const user = await db.user.findFirstOrThrow({
      where: { username: session.user.username },
    });

    const textEncoder = new TextEncoder();

    const data = await db.tasks.create({
      data: {
        ...newTask,
        //@ts-ignore
        image: textEncoder.encode(newTask.image),
        user: {
          connect: {
            ...user,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify({ data: data }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  const tasks = await db.tasks.findMany({
    where: {
      user: {
        username: session.user.username,
      },
    },
  });
  // console.log(tasks);
  return NextResponse.json({ tasks });
}
