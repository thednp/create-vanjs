import { A } from "@vanjs/router";

export const Footer = () => {
  return (
    <footer id="app-footer" class="flex p-4 bg-base-100">
      <A href="/">
        <span class="font-bold">VanJS</span> App
      </A>
      <span class="ml-auto flex gap-1">
        <span class="font-bold">thednp</span>
        <span>©</span>
        <span>{new Date().getFullYear()}</span>
      </span>
    </footer>
  );
};
