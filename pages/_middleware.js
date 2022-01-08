import { NextResponse } from "next/server";

export function middleware() {
  if (false) {
    return NextResponse.redirect("/browse");
  }
  return NextResponse.next();
}
