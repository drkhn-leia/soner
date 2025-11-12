// next.config.mjs
import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // (İsteğe bağlı) quality uyarısı görmemek için buraya istediğin kaliteyi ekleyebilirsin
  // images: { qualities: [75] },

  env: (() => {
    const heroDir = path.join(process.cwd(), "public", "hero");
    let files = [];
    try {
      files = fs
        .readdirSync(heroDir, { withFileTypes: true })
        .filter(
          (d) => d.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(d.name) // uzantı filtresi
        )
        .map((d) => `/hero/${d.name}`)
        .sort() // deterministik sıralama
        .slice(0, 20); // en fazla 20 görsel
    } catch (e) {
      // klasör yoksa veya hata varsa boş bırak
      files = [];
    }
    return {
      NEXT_PUBLIC_HERO_IMAGES: JSON.stringify(files),
    };
  })(),
};

export default nextConfig;
