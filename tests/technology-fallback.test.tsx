import { render,screen } from "@testing-library/react";import { describe,expect,it,vi } from "vitest";
vi.mock("@/data/skills",()=>({skills:[{name:"Unknown",category:"Tools",color:"#fff",icon:"MissingIcon"}]}));import { Skills } from "@/components/skills";
describe("technology icon fallback",()=>{it("still renders an accessible skill",()=>{render(<Skills/>);expect(screen.getByRole("button",{name:"Unknown, Tools"})).toBeInTheDocument()})});
