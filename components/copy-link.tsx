"use client";import { Check,Link2 } from "lucide-react";import { useState } from "react";
export function CopyLink(){const[copied,setCopied]=useState(false);return <button className="button" onClick={async()=>{await navigator.clipboard.writeText(location.href);setCopied(true);setTimeout(()=>setCopied(false),1600)}}>{copied?<Check/>:<Link2/>}{copied?"Copied":"Copy link"}</button>}
