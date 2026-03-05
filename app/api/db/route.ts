import { NextResponse } from "next/server"
import * as db from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { fn, args } = await req.json()
    
    // Safety check: only allow functions exported from lib/db
    if (typeof (db as any)[fn] !== "function") {
      return NextResponse.json({ error: `Function ${fn} not found` }, { status: 404 })
    }

    const result = await (db as any)[fn](...(args || []))
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("API DB Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
