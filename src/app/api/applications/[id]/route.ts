import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ZodError } from 'zod';
import { createApplicationRequestSchema } from '@/forms/create-application/create-application-validation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface IApplicationDetailErrorResponse {
  message: string;
  fieldErrors?: Record<string, string[]>;
}

const toNullableString = (value?: string) => (value && value.trim().length > 0 ? value : null);
const normalizeCompany = (value?: string) => value?.trim() || 'Unknown';

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

export async function PATCH(
  request: Request,
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
    const body = (await request.json()) as unknown;
    const values = createApplicationRequestSchema.parse(body);
    const normalizedCompany = normalizeCompany(values.company);

    const existingApplication = await prisma.application.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json<IApplicationDetailErrorResponse>(
        { message: 'Application not found' },
        { status: 404 },
      );
    }

    const updatedApplication = await prisma.application.update({
      where: {
        id: existingApplication.id,
      },
      data: {
        position: values.position,
        company: normalizedCompany,
        specialization: values.specialization,
        grade: values.grade,
        mainStack: values.mainStack,
        salary: Number.parseInt(values.salary, 10),
        currency: values.currency,
        period: values.period,
        contract: values.contract,
        url: toNullableString(values.url),
        notes: toNullableString(values.notes),
        status: values.status,
      },
    });

    return NextResponse.json({
      message: 'Application updated successfully',
      data: {
        ...updatedApplication,
        isFavorite: Boolean(updatedApplication.isFavorite),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const { fieldErrors } = error.flatten();

      return NextResponse.json<IApplicationDetailErrorResponse>(
        {
          message: 'Validation failed',
          fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error('Failed to update application detail:', error);

    return NextResponse.json<IApplicationDetailErrorResponse>(
      { message: 'Failed to update application detail' },
      { status: 500 },
    );
  }
}

export async function DELETE(
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
    const existingApplication = await prisma.application.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!existingApplication) {
      return NextResponse.json<IApplicationDetailErrorResponse>(
        { message: 'Application not found' },
        { status: 404 },
      );
    }

    await prisma.application.delete({
      where: {
        id: existingApplication.id,
      },
    });

    return NextResponse.json({
      message: 'Application deleted successfully',
      data: {
        id: existingApplication.id,
      },
    });
  } catch (error) {
    console.error('Failed to delete application:', error);

    return NextResponse.json<IApplicationDetailErrorResponse>(
      { message: 'Failed to delete application' },
      { status: 500 },
    );
  }
}
