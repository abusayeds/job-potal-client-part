// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleImageError = (e: any) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/demo-profile.jpg'; // your fallback image
}