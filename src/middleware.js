
export { default } from "next-auth/middleware";

export const config =
{ matcher: ['/nuevaEscritura/:path*'],
matcher: ['/editarLibro/:path*']
};