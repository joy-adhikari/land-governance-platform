import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    const validEmail = process.env.AUTH_EMAIL;
    const validPassword = process.env.AUTH_PASSWORD;

    if (!validEmail || !validPassword) {
      return NextResponse.json(
        { error: "Authentication server is not configured." },
        { status: 500 }
      );
    }

    if (email === validEmail && password === validPassword) {
      // Return mock user data based on the role
      return NextResponse.json({
        user: {
          id: "user-123",
          email,
          full_name: role === "ADMIN" ? "System Administrator" : "Verified User",
          role: role,
          organization: role === "RESEARCHER" ? "IIT Bombay" : "DoLR",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
