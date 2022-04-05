/**
 * Add imgProxySignedUrl type to other types
 * @param T - Type of the object we want to add imgProxySignedUrl to it
 */
export type WithImgProxyUrlType<T> = Partial<T> & { imgProxySignedUrl?: string; };