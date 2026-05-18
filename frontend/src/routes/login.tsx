import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import editImg from "@/assets/edit-himalayan.jpg";
import { googleLogin, login as loginApi } from "@/api/server";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleLoginCredentials } from "@/type/type";
import { signInRedux } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

// Extend window to include the Google Identity Services callback
declare global {
  interface Window {
    handleGoogleCredentialResponse?: (response: { credential: string }) => void;
  }
}

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Kailash Collective" }] }),
  component: Login,
});

function Login() {
  return <AuthShell mode="login" />;
}

export function AuthShell({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthentication } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthentication) {
      navigate({ to: "/profile" });
    }
  }, [isAuthentication, navigate]);

  const titles = {
    login: { h: "Welcome back.", s: "Sign in to your Kailash account." },
    signup: { h: "Create your account.", s: "Save favourites, track orders, get early access." },
    forgot: { h: "Reset your password.", s: "We'll email you a recovery link." },
  } as const;
  const t = titles[mode];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      setIsLoading(true);
      const res = await loginApi({ email, password });
      setIsLoading(false);
      
      if (res && !res.error) {
        navigate({ to: "/" });
      } else {
        alert(res?.error || res?.response?.data?.error || "Login failed");
      }
    }
  };
  const onSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse.credential;
    const decodedToken = jwtDecode(credential);
    const payload = {
      googleId: decodedToken?.sub,
      name: decodedToken?.name,
      email: decodedToken?.email,
      avatar: decodedToken?.picture,
    } as GoogleLoginCredentials
    const res = await googleLogin(payload);
    
    if(res && !res.error){
      const data = {
        token: res.token,
        user: res.user
      }
      dispatch(signInRedux(res?.data))
      navigate({ to: "/" });
    }else{
      alert(res?.error || res?.response?.data?.error || "Login failed");
    }
  }
  const onFailure = () => {
    console.log("Google login failed");
  }

  return (
    <SiteShell>
      <section className="container-wide grid lg:grid-cols-2 gap-10 py-12 md:py-16">
        <div className="hidden lg:block aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
          <img src={editImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="max-w-md mx-auto w-full self-center">
          <h1 className="font-display text-4xl md:text-5xl">{t.h}</h1>
          <p className="mt-3 text-muted-foreground">{t.s}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "signup" && <Floating label="Full name" type="text" value={name} onChange={(e) => setName(e.target.value)} />}
            <Floating label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {mode !== "forgot" && (
              <div className="relative">
                <Floating label="Password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ink text-cream cursor-pointer rounded-full py-3.5 text-sm tracking-wider hover:bg-maroon transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Please wait..." : mode === "login"
                ? "Sign in"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
            </button>
          </form>

          {mode !== "forgot" && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or{" "}
                <span className="h-px flex-1 bg-border" />
              </div>

              <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
                buttonText="Sign in with Google"
                cookiePolicy="single_host_origin"
                isSignin={true}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </>
          )}

          <p className="mt-8 text-sm text-muted-foreground">
            {mode === "login" && (
              <>
                New here?{" "}
                <Link to="/signup" className="text-maroon hover:underline">
                  Create account
                </Link>{" "}
                ·{" "}
                <Link to="/forgot-password" className="hover:underline">
                  Forgot password
                </Link>
              </>
            )}
            {mode === "signup" && (
              <>
                Already a member?{" "}
                <Link to="/login" className="text-maroon hover:underline">
                  Sign in
                </Link>
              </>
            )}
            {mode === "forgot" && (
              <>
                <Link to="/login" className="text-maroon hover:underline">
                  Back to sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}

function Floating({ label, type, value, onChange }: { label: string; type: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="relative block">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full bg-card border border-border rounded-lg px-4 pt-5 pb-2 text-sm focus:outline-none focus:border-maroon transition"
      />
      <span className="pointer-events-none absolute left-4 top-3.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
}
