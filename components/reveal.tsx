"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({children,className="",distance=34}:{children:React.ReactNode;className?:string;distance?:number}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:distance}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.16,margin:"-40px 0px -40px"}} transition={{duration:.62,ease:[.22,1,.36,1]}}>{children}</motion.div>}
