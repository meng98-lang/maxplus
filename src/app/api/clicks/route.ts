import { NextResponse } from "next/server";
import { recordClick, getClickStats } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await recordClick(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = await getClickStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
