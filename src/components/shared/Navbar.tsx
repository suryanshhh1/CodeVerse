import { auth, signOut } from "@/lib/auth";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const session = await auth();

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return <NavbarClient session={session} signOutAction={signOutAction} />;
}
