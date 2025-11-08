import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { readdirSync, unlinkSync } from "fs";
import path from "path";

const inputFolder = "public/images";
const outputFolder = "public/images";

(async () => {
    console.log("🌀 Mengonversi semua gambar ke WebP...");

    await imagemin([`${inputFolder}/*.{jpg,jpeg,png}`], {
        destination: outputFolder,
        plugins: [
            imageminWebp({
                quality: 80,
            }),
        ],
    });

    console.log("✅ Semua gambar berhasil dikonversi ke WebP!");

    const files = readdirSync(outputFolder);
    files.forEach((file) => {
        if (/\.(jpg|jpeg|png)$/i.test(file)) {
            unlinkSync(path.join(outputFolder, file));
            console.log(`🗑️ Hapus file asli: ${file}`);
        }
    });

    console.log("🎉 Semua gambar kini dalam format WebP!");
})();
