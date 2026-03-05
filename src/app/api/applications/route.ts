import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ZodError } from 'zod';
import { createApplicationRequestSchema } from '@/forms/create-application/create-application-validation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface ICreateApplicationErrorResponse {
  message: string;
  fieldErrors?: Record<string, string[]>;
}

const toNullableString = (value?: string) => (value && value.trim().length > 0 ? value : null);

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<ICreateApplicationErrorResponse>(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      message: 'Applications fetched successfully',
      data: applications,
    });
  } catch (error) {
    console.error('Failed to fetch applications:', error);

    return NextResponse.json<ICreateApplicationErrorResponse>(
      { message: 'Failed to fetch applications' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json<ICreateApplicationErrorResponse>(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as unknown;
    const values = createApplicationRequestSchema.parse(body);

    const createdApplication = await prisma.application.create({
      data: {
        position: values.position,
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
        userId,
      },
    });

    return NextResponse.json({
      message: 'Application created successfully',
      data: createdApplication,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const { fieldErrors } = error.flatten();

      return NextResponse.json<ICreateApplicationErrorResponse>(
        {
          message: 'Validation failed',
          fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error('Failed to create application:', error);

    return NextResponse.json<ICreateApplicationErrorResponse>(
      { message: 'Failed to create application' },
      { status: 500 },
    );
  }
}
