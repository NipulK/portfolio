"use client";
import { Moon,Sun } from "lucide-react";import { useTheme } from "./providers";
export function ThemeToggle(){const{theme,toggle}=useTheme();return <button onClick={toggle} className="icon-btn" aria-label={`Switch to ${theme==="dark"?"light":"dark"} mode`}>{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>}
