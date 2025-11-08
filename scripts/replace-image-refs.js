import fs from "fs";
import path from "path";

const replaceExtensions = [".js", ".jsx", ".ts", ".tsx", ".html", ".css"];
const rootDirs = ["./src", "./public"];

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    const newContent = content.replace(/\.(jpg|jpeg|png)/gi, ".webp");
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, "utf8");
        console.log(`🔁 Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (replaceExtensions.includes(path.extname(file))) {
            replaceInFile(fullPath);
        }
    });
}

console.log("🌀 Mengganti referensi .jpg/.png ke .webp di semua file React...");
rootDirs.forEach((dir) => walkDir(dir));
console.log("✅ Semua referensi gambar sudah diganti ke .webp!");
