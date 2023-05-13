import { Home } from "lucide-react";

export default function Str2Icon({
  str,
  className,
}: {
  str: string;
  className?: string;
}) {
  return <>{str === "home" ? <Home className={className} /> : <></>}</>;
}
