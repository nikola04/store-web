export function stringToArrayBuffer(str: string): ArrayBuffer {
    // For base64url encoded strings
    const padding = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
  
export function arrayBufferToString(buffer: ArrayBuffer): string {
    // Converts to base64url
    const bytes = new Uint8Array(buffer);
    const binaryString = String.fromCharCode(...bytes);
    return btoa(binaryString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}
