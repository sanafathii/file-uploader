import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll("file");

        if (files.length === 0) {
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

        const MAX_SIZE = 10 * 1024 * 1024;
        const uploadedFiles = [];
        const errors = [];

        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                errors.push(
                    `Invalid file type: ${file.name}. Allowed types: ${allowedTypes.join(
            ", "
          )}`
                );
                continue;
            }

            if (file.size > MAX_SIZE) {
                errors.push(`File ${file.name} exceeds the 10MB size limit.`);
                continue;
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = path.join(uploadDir, file.name);

            await writeFile(filePath, buffer);
            uploadedFiles.push(`/uploads/${file.name}`);
        }

        if (errors.length > 0) {
            return NextResponse.json({ error: "Some files failed to upload", details: errors }, { status: 400 });
        }

        return NextResponse.json({ message: "Files uploaded successfully", files: uploadedFiles }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}