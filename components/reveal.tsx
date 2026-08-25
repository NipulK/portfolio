"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.45,ease:"easeOut"}}>{children}</motion.div>}
