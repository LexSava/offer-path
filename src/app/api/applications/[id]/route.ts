import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface IApplicationDetailErrorResponse {
  message: string;
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<IApplicationDetailErrorResponse>(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await context.params;

  try {
    const application = await prisma.application.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!application) {
      return NextResponse.json<IApplicationDetailErrorResponse>(
        { message: 'Application not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: 'Application fetched successfully',
      data: {
        ...application,
        isFavorite: Boolean(application.isFavorite),
      },
    });
  } catch (error) {
    console.error('Failed to fetch application detail:', error);

    return NextResponse.json<IApplicationDetailErrorResponse>(
      { message: 'Failed to fetch application detail' },
      { status: 500 },
    );
  }
}
