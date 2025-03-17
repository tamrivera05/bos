import { redirect } from "next/navigation";

export default function Main() {
  redirect("/main/directory");
  return null;
}
