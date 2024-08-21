import path from "path";
import { promises as fs } from "fs";

export async function imageUplaod(image: File) {
  console.log(image);
  const buffer = Buffer.from(await image.arrayBuffer());
  const imagePath = path.join(process.cwd(), "public", "materials", image.name);

  await fs.writeFile(imagePath, buffer);
}
