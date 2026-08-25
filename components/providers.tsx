"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { SmoothScroll } from "./smooth-scroll";
type Theme="dark"|"light";
const ThemeContext=createContext({theme:"dark" as Theme,toggle:()=>{}});
export function Providers({children}:{children:React.ReactNode}){const[theme,setTheme]=useState<Theme>("dark");useEffect(()=>{const saved=localStorage.getItem("nk-theme") as Theme|null;const next=saved??"dark";setTheme(next);document.documentElement.classList.toggle("dark",next==="dark")},[]);const toggle=()=>setTheme(current=>{const next=current==="dark"?"light":"dark";localStorage.setItem("nk-theme",next);document.documentElement.classList.toggle("dark",next==="dark");return next});return <ThemeContext.Provider value={{theme,toggle}}><SmoothScroll/>{children}</ThemeContext.Provider>}
export const useTheme=()=>useContext(ThemeContext);
