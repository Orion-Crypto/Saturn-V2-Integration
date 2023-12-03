import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const assets = body.assets;

    const blockfrostAPIKey = process.env.BLOCKFROST_API_KEY as string;
    const blockfrostAPIUrl = process.env.BLOCKFROST_API_URL as string;

    const metadata = [];
    for (const asset of assets) {
        const response = await fetch(`${blockfrostAPIUrl}/assets/${asset}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                project_id: blockfrostAPIKey,
            },
        });
        const data = await response.json();
        metadata.push(data);
    }

    return NextResponse.json({ metadata });
}
