import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const task = await db.tasks.findFirst({
    where: {
      user: {
        username: session.user.username,
      },
      id: parseInt(params.id),
    },
  });
  return NextResponse.json({ task });
}

export async function DELETE(req, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (session.user == undefined) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const task = await db.tasks.findFirst({
    where: {
      user: {
        username: session.user.username,
      },
      id: parseInt(params.id),
    },
  });
  if (task.id == undefined) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  await db.tasks.delete({ where: { id: task.id } });
  return NextResponse.json({ message: 'done' });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the session to ensure the user is authenticated
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const updatedTaskData = await req.json();

  // Find the task to be updated
  const task = await db.tasks.findFirst({
    where: {
      id: parseInt(params.id),
      user: {
        username: session.user.username,
      },
    },
  });

  // Check if the task exists
  if (!task) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  // Update the task
  const updatedTask = await db.tasks.update({
    where: { id: task.id },
    data: {
      ...updatedTaskData,
      image: new TextEncoder().encode(updatedTaskData.image),
    },
  });

  // Return the updated task
  return NextResponse.json({ task: updatedTask });
}
