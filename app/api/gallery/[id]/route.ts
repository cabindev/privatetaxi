import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: params.id },
    });

    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const image = formData.get('image') as File | null;

    let imagePath = undefined;

    if (image) {
      const oldGallery = await prisma.gallery.findUnique({ where: { id: params.id } });
      if (oldGallery?.image) {
        const oldFilePath = path.join(process.cwd(), 'public', oldGallery.image.slice(1));
        try {
          await unlink(oldFilePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const filepath = path.join(process.cwd(), 'public', 'img', filename);
      await writeFile(filepath, buffer);
      imagePath = `/img/${filename}`;
    }

    const gallery = await prisma.gallery.update({
      where: { id: params.id },
      data: {
        title,
        ...(imagePath && { image: imagePath }),
      },
    });

    revalidatePath('/gallerys');
    revalidatePath('/');  // If gallery is shown on the home page
    revalidatePath(`/gallerys/${params.id}`);

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Error updating gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gallery = await prisma.gallery.findUnique({ where: { id: params.id } });

    if (gallery?.image) {
      const filePath = path.join(process.cwd(), 'public', gallery.image.slice(1));
      try {
        await unlink(filePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    await prisma.gallery.delete({ where: { id: params.id } });

    revalidatePath('/gallerys');
    revalidatePath('/');  // If gallery is shown on the home page

    return NextResponse.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}