/**
 * Uploads an image to the IMGBB API and returns the hosted URL.
 * Make sure NEXT_PUBLIC_IMGBB_API_KEY is defined in your environment (.env.local or Vercel Settings).
 */
export const uploadImageToImgbb = async (imageFile: File): Promise<string | null> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
        console.error("Missing NEXT_PUBLIC_IMGBB_API_KEY in environment variables.");
        return null;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data && data.data && data.data.url) {
            return data.data.url; // Returns the uploaded image URL
        } else {
            console.error("Upload failed:", data);
            return null;
        }
    } catch (error) {
        console.error("Error uploading image to Imgbb:", error);
        return null;
    }
};
