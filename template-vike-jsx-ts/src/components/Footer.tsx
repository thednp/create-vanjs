import { Link } from "../components/Link";

export const Footer = () => {
  return (
    <footer id="app-footer" class="flex p-4 bg-base-100">
      <Link href={"/" as string}>
        <span class="font-bold">VanJS</span>
        {" "}
        App
      </Link>
      <span class="ml-auto flex gap-1">
        <span class="font-bold">thednp</span>
        <span>©</span>
        <span>{new Date().getFullYear()}</span>
      </span>
    </footer>
  );
};
