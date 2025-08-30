const config = {
  apiUrl: process.env.NEXT_PUBLIC_SERVER_URL as string,
  imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL as string,
  jwtSecret: process.env.JWT_SECRET_KEY as string,
  // apiKey: process.env.API_KEY,
  //   isProduction: process.env.NODE_ENV === 'production',
};

export const { apiUrl, imageUrl, jwtSecret } = config;
