import { useState } from "react";
import { auth, getAdminPasscode, setAdminPasscode, verifyAdminPasscode } from "@/lib/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const ChangePassword = () => {
  // Master Passcode states
  const [currentPasscode, setCurrentPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");

  // Firebase Auth states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;
  const hasEmailProvider = user?.providerData.some((p) => p.providerId === "password");

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyAdminPasscode(currentPasscode)) {
      toast.error("Current admin passcode is incorrect");
      return;
    }
    if (newPasscode.length < 6) {
      toast.error("New passcode must be at least 6 characters");
      return;
    }
    if (newPasscode !== confirmPasscode) {
      toast.error("New passcodes do not match");
      return;
    }

    setAdminPasscode(newPasscode.trim());
    toast.success("Admin Master Passcode updated successfully!");
    setCurrentPasscode("");
    setNewPasscode("");
    setConfirmPasscode("");
  };

  const handleChangeFirebasePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (!user) throw new Error("Not authenticated");

      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast.success("Firebase account password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      const msg =
        code === "auth/wrong-password"
          ? "Current password is incorrect"
          : code === "auth/requires-recent-login"
          ? "Please log out and log in again before changing your password"
          : "Failed to update password. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Admin Master Passcode Card ── */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <KeyRound className="h-5 w-5 text-primary" /> Admin Master Passcode
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Update the quick-access PIN used to log into this admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePasscode} className="space-y-4 max-w-md">
            <div className="space-y-1.5">
              <Label htmlFor="current-passcode" className="text-xs">Current Passcode</Label>
              <Input
                id="current-passcode"
                type="password"
                value={currentPasscode}
                onChange={(e) => setCurrentPasscode(e.target.value)}
                placeholder="Enter current passcode"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-passcode" className="text-xs">New Passcode</Label>
              <Input
                id="new-passcode"
                type="password"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                placeholder="Min 6 characters"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-passcode" className="text-xs">Confirm New Passcode</Label>
              <Input
                id="confirm-passcode"
                type="password"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                placeholder="Repeat new passcode"
                className="bg-background/50"
              />
            </div>

            <Button type="submit" size="sm" className="gap-1.5 bg-primary text-primary-foreground font-medium">
              <ShieldCheck className="h-4 w-4" /> Save New Passcode
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ── Firebase Password Card (if email account) ── */}
      {hasEmailProvider && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Lock className="h-5 w-5 text-primary" /> Firebase Account Password
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Update your Firebase email login password for {user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangeFirebasePassword} className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <Label htmlFor="current-password" className="text-xs">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10 bg-background/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-password" className="text-xs">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10 bg-background/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-xs">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-background/50"
                />
              </div>

              <Button type="submit" size="sm" disabled={loading} className="gap-1.5">
                {loading ? "Updating..." : "Update Firebase Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChangePassword;

