import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import Cloudinary from "cloudinary";
import { Readable } from "stream";

Cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const readableStreamToReadable = (
  stream: ReadableStream<Uint8Array>
): Readable => {
  const reader = stream.getReader();
  return new Readable({
    read(size) {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            this.push(null);
          } else {
            this.push(Buffer.from(value));
          }
        })
        .catch((err) => {
          this.destroy(err);
        });
    },
  });
};

const streamToBuffer = (stream: Readable): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};

export async function GET() {
  try {
    // Truy vấn lấy tất cả sản phẩm từ bảng 'products'
    const result = await sql`
    SELECT 
      p.*, 
      json_build_object(
        'title', d.title,
        'subtitle', d.subtitle,
        'content', d.content,
        'description_images', d.description_images
      ) AS description
    FROM products p
    LEFT JOIN descriptions d ON p.id = d.product_id;
  `;

    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Đã có lỗi sảy ra" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;

  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const content = formData.get("content") as string;

  const images = formData.getAll("images");
  const descriptionImages = formData.getAll("description_images");

  try {
    const uploadProductImagePromises = images
      .filter((image): image is File => image instanceof File)
      .map(async (image) => {
        const readableStream = readableStreamToReadable(image.stream());
        const buffer = await streamToBuffer(readableStream);
        return new Promise<string>((resolve, reject) => {
          Cloudinary.v2.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result?.secure_url || "");
              }
            })
            .end(buffer);
        });
      });

    const uploadDescriptionImagePromises = descriptionImages
      .filter((image): image is File => image instanceof File)
      .map(async (image) => {
        const readableStream = readableStreamToReadable(image.stream());
        const buffer = await streamToBuffer(readableStream);
        return new Promise<string>((resolve, reject) => {
          Cloudinary.v2.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result?.secure_url || "");
              }
            })
            .end(buffer);
        });
      });

    const imageUrls = await Promise.all(uploadProductImagePromises);
    const descriptionImageUrls = await Promise.all(
      uploadDescriptionImagePromises
    );

    const result = await sql`
        INSERT INTO products (name, price, category, images)
        VALUES (${name}, ${price}, ${category}, ${JSON.stringify(
      imageUrls
    )}::jsonb)
        RETURNING id;
      `;

    const productId = result.rows[0].id;

    await sql`
        INSERT INTO descriptions (product_id, title, subtitle, content, description_images)
        VALUES (${productId}, ${title}, ${subtitle}, ${content}, ${JSON.stringify(
      descriptionImageUrls
    )}::jsonb);
      `;

    return NextResponse.json(
      { message: "Thêm sản phẩm thành công" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Đã có lỗi sảy ra" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { productId } = await req.json();

  const id = parseInt(productId, 10);

  if (isNaN(id)) {
    return NextResponse.json(
      { error: "Id sản phẩm không hợp lệ" },
      { status: 400 }
    );
  }

  try {
    const productResult = await sql`
      SELECT p.images AS product_images, d.description_images AS description_images
      FROM products p
      LEFT JOIN descriptions d ON p.id = d.product_id
      WHERE p.id = ${id}
    `;

    if (productResult.rowCount === 0) {
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại" },
        { status: 404 }
      );
    }

    const { product_images, description_images } = productResult.rows[0];

    for (const image of product_images || []) {
      const publicId = image.split("/").pop()?.split(".")[0] || "";
      if (publicId) {
        await new Promise((resolve, reject) => {
          Cloudinary.v2.uploader.destroy(
            publicId,
            (error: any, result: unknown) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
        });
      }
    }

    for (const image of description_images || []) {
      const publicId = image.split("/").pop()?.split(".")[0] || "";
      if (publicId) {
        await new Promise((resolve, reject) => {
          Cloudinary.v2.uploader.destroy(
            publicId,
            (error: any, result: unknown) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
        });
      }
    }

    await sql`
      DELETE FROM descriptions
      WHERE product_id = ${id}
    `;

    await sql`
      DELETE FROM products
      WHERE id = ${id}
    `;

    return NextResponse.json(
      {
        message: "Xoá sản phẩm thành công",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Đã có lỗi sảy ra" }, { status: 500 });
  }
}
