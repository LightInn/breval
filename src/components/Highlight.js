"use client";
import hljs from "highlight.js";
import "highlight.js/styles/panda-syntax-dark.min.css";

export default function Highlight() {
  if (typeof window !== "undefined") {
    hljs.highlightAll();
  }
  return null;
}
