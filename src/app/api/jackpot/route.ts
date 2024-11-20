'use server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Parse the incoming JSON body
    const backendServer = process.env.SERVER_URL
    const { userId, currency_type = "points", times = 1 } = await request.json();

    /////////////////////////////////////////////
    // CHECK IF THE USER IS LOGGED AND NOT BANNED
    /////////////////////////////////////////////

    // Validate required fields
    if (!userId) {
        return NextResponse.json(
            { error: "userId is required", status: 400 }
        );
    }

    // Validate optional fields
    const validCurrencies = ["points", "chips", "free"];
    if (!validCurrencies.includes(currency_type)) {
        return NextResponse.json(
            {
                error: 'Invalid currency_type',
                status: 400
            }
        );
    }

    if (typeof times !== "number" || times < 1) {
        return NextResponse.json(
            {
                error: "Invalid times value. Must be a number greater than or equal to 1",
                status: 400
            }
        );
    }

    // ASK TO SERVER THE NUMBERS
    try {
        const backendRes = await fetch(`${backendServer}/numbers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, currency_type, times }),
        });

        if (!backendRes.ok) {
            const errorData = await backendRes.json();
            return NextResponse.json({ error: errorData.error || "Flask server error", status: backendRes.status });
        }

        const data = await backendRes.json();

        return NextResponse.json({
            user_id: userId,
            ...data,
        });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to communicate with Flask server",
            details: error,
            status: 500,
        });
    }
}
