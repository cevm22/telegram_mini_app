'use server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Parse the incoming JSON body
    const { userId, currency_type = "points", times = 1 } = await request.json();

    /////////////////////////////////////////////
    // CHECK IF THE USER IS LOGGED AND NOT BANNED
    // ASK TO SERVER THE NUMBERS
    // RETURN IN JSON THE numbers in array[number,win/1-lose/0], 
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

    // Mock response
    return NextResponse.json({
        user_id: userId,
        numbers: [[123456, 0], [654321, 0], [987123, 0]],
        jackpot_bal: 123.45,
        user_bal: { points: 123, chips: 456, free_rolls: 7 },
    });
}
