import { NextRequest, NextResponse } from "next/server";
import { ImgurClient } from 'imgur';
import { createReadStream, read } from "fs";
import { PassThrough } from "stream";
import { ImageData } from "imgur/lib/common/types";

const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN,
});

export type UploadImageResponse = ImageData;


export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get('file');
    if (file instanceof Blob) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await client.upload({
            image: buffer,
            type: 'stream',
        });
        const { data, headers, status, success } = res;
        console.log(data);
        return NextResponse.json({
            success: true,
            result: data
        }, { status: 200 })
    }
}

