import { NextResponse } from "next/server";
import { getPixels, upsertPixel, deletePixel } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pixels = await getPixels();
    return NextResponse.json(pixels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pixels" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pixel = await upsertPixel(body);
    return NextResponse.json(pixel);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save pixel" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await deletePixel(body.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete pixel" }, { status: 500 });
  }
}
