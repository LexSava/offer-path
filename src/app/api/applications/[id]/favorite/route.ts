import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface IFavoriteErrorResponse {
  message: string;
}

export async function PATCH(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<IFavoriteErrorResponse>({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const existingApplication = await prisma.application.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json<IFavoriteErrorResponse>(
        { message: 'Application not found' },
        { status: 404 },
      );
    }

    const updatedApplication = await prisma.application.update({
      where: {
        id: existingApplication.id,
      },
      data: {
        isFavorite: !Boolean(existingApplication.isFavorite),
      },
    });

    return NextResponse.json({
      message: 'Favorite state updated successfully',
      data: {
        id: updatedApplication.id,
        isFavorite: Boolean(updatedApplication.isFavorite),
      },
    });
  } catch (error) {
    console.error('Failed to update favorite state:', error);

    return NextResponse.json<IFavoriteErrorResponse>(
      { message: 'Failed to update favorite state' },
      { status: 500 },
    );
  }
}
