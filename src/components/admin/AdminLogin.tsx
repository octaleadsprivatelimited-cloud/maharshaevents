import { useState, useEffect } from "react";
import {
  auth,
  googleProvider,
  setAdminSession,
  isAdminEmail,
  MAIN_ADMIN_EMAIL,
} from "@/lib/firebase";
import {
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setCurrentUser(u);
    });
    return unsub;
  }, []);

  const triggerSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      window.location.reload();
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userEmail = res.user.email;

      if (isAdminEmail(userEmail)) {
        setAdminSession({
          authenticated: true,
          email: userEmail || MAIN_ADMIN_EMAIL,
          loginMethod: "google",
          timestamp: Date.now(),
        });
        toast.success(`Welcome back, ${res.user.displayName || "Admin"}!`);
        triggerSuccess();
      } else {
        toast.error("Access denied. This email is not authorized.");
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code !== "auth/popup-closed-by-user") {
        toast.error("Google sign-in could not be completed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutCurrentUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      toast.success("Signed out successfully");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // ─── Unauthorized Account View ───
  if (currentUser && !isAdminEmail(currentUser.email)) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#060a12] p-4 text-foreground selection:bg-gold/20 selection:text-gold-light">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0c121e]/95 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-inner">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-white">
                Access Denied
              </h1>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                You are currently authenticated as:
              </p>
              <div className="inline-block rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-zinc-300">
                {currentUser.email}
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-left text-xs leading-relaxed text-amber-200/90">
              <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" /> Restricted Access
              </p>
              Admin panel access is strictly reserved for the primary administrator at{" "}
              <span className="font-mono text-white font-semibold underline underline-offset-2">
                {MAIN_ADMIN_EMAIL}
              </span>.
            </div>

            <div className="w-full pt-2 space-y-2.5">
              <Button
                type="button"
                onClick={handleSignOutCurrentUser}
                className="w-full gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium shadow-lg transition-all"
              >
                <LogOut className="h-4 w-4" /> Sign In with Different Account
              </Button>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors w-full pt-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Return to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Professional Luxury Login View ───
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#060a12] p-4 text-foreground selection:bg-gold/20 selection:text-gold-light">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#0ea5e9]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gold/20 bg-[#0c121e]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Header section with brand logo */}
        <div className="flex flex-col items-center text-center space-y-3 pb-6">
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-white/95 p-3 shadow-2xl border-2 border-gold/40 hover:border-gold transition-all duration-300">
            <img
              src="/logo.webp"
              alt="Maharsha Events"
              width="96"
              height="96"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-gradient-gold">
              Maharsha Events
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-semibold tracking-wider uppercase text-gold">
              <ShieldCheck className="w-3 h-3" /> Admin Portal
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pb-6" />

        {/* Sign In Action Area */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 gap-3 border-white/10 bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-zinc-700" />
            ) : (
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span>{loading ? "Authenticating with Google..." : "Continue with Google"}</span>
          </Button>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 text-center border-t border-white/5 mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors font-medium"
          >
            <ArrowLeft className="h-3 w-3" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


