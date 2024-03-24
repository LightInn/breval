"use client";
import hljs from "highlight.js";
import "highlight.js/styles/panda-syntax-dark.min.css";
import { useEffect } from "react";

export default function Highlight() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      hljs.highlightAll();
    }
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois après le premier rendu

  return null;
}
