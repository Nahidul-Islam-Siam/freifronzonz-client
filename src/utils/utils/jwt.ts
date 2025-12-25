// src/utils/jwt.ts
export const decodeToken = (token: string): { exp: number; iat: number } | null => {
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return {
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};