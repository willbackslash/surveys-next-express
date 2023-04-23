import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session) {
      router.push("/surveys");
    }
  }, [session, router]); 

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 bg-dark">
        <h3 className="text-white">Loading...</h3>
      </div>
    );
  }

  return (
    <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center bg-dark">
      <button className="btn btn-primary" onClick={() => signIn('okta')}>
        Sign in With Okta
      </button>
    </div>
  );
}
