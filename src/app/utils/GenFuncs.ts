export const generateUUID = (size: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: size }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
