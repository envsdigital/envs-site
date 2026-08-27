"use client";

import { createContext, useContext } from "react";
import { defaultContent, type Content } from "@/data/content";

const Ctx = createContext<Content>(defaultContent);

export const useContent = () => useContext(Ctx);

export function ContentProvider({
  value,
  children,
}: {
  value: Content;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
