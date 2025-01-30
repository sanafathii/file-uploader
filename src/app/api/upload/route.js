import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll("file");

        if (!files.length) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), "public/uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif",
            "image/webp",
        ];
        const uploadedFiles = [];

        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json({ error: `Invalid file type: ${file.name}` }, { status: 400 });
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = path.join(uploadDir, file.name);

            await writeFile(filePath, buffer);
            uploadedFiles.push(`/uploads/${file.name}`);
        }

        return NextResponse.json({ message: "Images uploaded successfully", files: uploadedFiles }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}