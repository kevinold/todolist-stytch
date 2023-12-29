import { useStytch, useStytchUser } from "@stytch/nextjs";
import Link from "next/link";
export default function Header() {
  const stytch = useStytch();
  const { user } = useStytchUser();
  return (
    <header>
      <Link className="header" href="/">
        Shared TodoList
      </Link>
      <div className="link-container">
        {user && (
          <button
            data-type="btn-logout"
            type="button"
            className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => stytch.session.revoke()}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
