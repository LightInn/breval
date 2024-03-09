"use client";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.min.css";

export default function Highlight() {
  if (typeof window !== "undefined") {
    hljs.highlightAll();
  }
  return null;
}
