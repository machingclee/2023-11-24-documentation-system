import { NextResponse } from "next/server"

const json = (json: any) => {
    return NextResponse.json(json, { status: 200 })
}

export default {
    json: json
}