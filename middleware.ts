import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Next.js-ийн дотоод файлуудаас бусад бүх хүсэлтийг Clerk-ээр дамжуулна
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API болон trpc-г заавал шалгана
    "/(api|trpc)(.*)",
  ],
};
