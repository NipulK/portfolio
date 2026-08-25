import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geist=Geist({subsets:["latin"],variable:"--font-geist"});
const mono=Geist_Mono({subsets:["latin"],variable:"--font-mono"});
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Nipul Kanishka",template:"%s — Nipul Kanishka"},description:"Portfolio of Nipul Kanishka, an NIBM computing undergraduate building web, mobile, API, data and game projects.",alternates:{canonical:"/"},openGraph:{title:"Nipul Kanishka",description:"Thoughtful software for real-world problems.",url:siteUrl,siteName:"Nipul Kanishka",images:["/og.png"],type:"website"},twitter:{card:"summary_large_image",images:["/og.png"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${mono.variable}`}><Providers><a href="#main" className="skip">Skip to content</a><Navbar/>{children}<Footer/><Analytics/></Providers></body></html>}
