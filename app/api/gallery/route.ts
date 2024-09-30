import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  try {
    const [galleries, totalItems] = await prisma.$transaction([
      prisma.gallery.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.gallery.count(),
    ]);

    return NextResponse.json({ galleries, totalItems, page, limit });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(process.cwd(), 'public', 'img', filename);
    await writeFile(filepath, buffer);

    const gallery = await prisma.gallery.create({
      data: {
        title,
        image: `/img/${filename}`,
      },
    });

    revalidatePath('/gallerys');
    revalidatePath('/');  // If gallery is shown on the home page

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Error creating gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}