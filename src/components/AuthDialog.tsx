import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Strong password validation schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const emailSchema = z
  .string()
  .email("Invalid email address")
  .trim()
  .toLowerCase()
  .max(255, "Email must be less than 255 characters");

// PAN number validation schema (exactly 10 alphanumeric characters)
const panSchema = z
  .string()
  .trim()
  .toUpperCase()
  .length(10, "PAN must be exactly 10 characters")
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format. Must be like ABCDE1234F");

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPan, setSignUpPan] = useState("");
  const [signInEmailError, setSignInEmailError] = useState("");
  const [signInPasswordError, setSignInPasswordError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState("");
  const [signUpPanError, setSignUpPanError] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const { toast } = useToast();

  // Validate PAN
  const validatePan = (pan: string, setError: (error: string) => void): boolean => {
    try {
      panSchema.parse(pan);
      setError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
      return false;
    }
  };

  // Calculate password strength (0-100)
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const getStrengthColor = (strength: number): string => {
    if (strength < 40) return "bg-destructive";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number): string => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    return "Strong";
  };

  // Validate email
  const validateEmail = (email: string, setError: (error: string) => void): boolean => {
    try {
      emailSchema.parse(email);
      setError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
      return false;
    }
  };

  // Validate password for signup
  const validatePassword = (password: string, setError: (error: string) => void, isSignUp: boolean): boolean => {
    if (isSignUp) {
      try {
        passwordSchema.parse(password);
        setError("");
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(error.errors[0].message);
        }
        return false;
      }
    } else {
      if (!password) {
        setError("Password is required");
        return false;
      }
      setError("");
      return true;
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetEmailError("");

    const isEmailValid = validateEmail(resetEmail, setResetEmailError);
    if (!isEmailValid) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        resetEmail.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/`,
        }
      );

      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for a password reset link.",
      });
      
      setResetEmail("");
      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInEmailError("");
    setSignInPasswordError("");

    const isEmailValid = validateEmail(signInEmail, setSignInEmailError);
    const isPasswordValid = validatePassword(signInPassword, setSignInPasswordError, false);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail.trim().toLowerCase(),
        password: signInPassword,
      });

      if (error) {
        // Generic error message for security (don't reveal if email exists)
        throw new Error("Invalid email or password. Please check your credentials and try again.");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      setSignInEmail("");
      setSignInPassword("");
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpEmailError("");
    setSignUpPasswordError("");
    setSignUpPanError("");

    const isEmailValid = validateEmail(signUpEmail, setSignUpEmailError);
    const isPasswordValid = validatePassword(signUpPassword, setSignUpPasswordError, true);
    const isPanValid = validatePan(signUpPan, setSignUpPanError);

    if (!isEmailValid || !isPasswordValid || !isPanValid) {
      return;
    }

    setIsLoading(true);

    try {
      // First, validate and register PAN with email
      const { error: panError } = await supabase.rpc('register_pan_for_email', {
        p_email: signUpEmail.trim().toLowerCase(),
        p_pan: signUpPan.trim().toUpperCase()
      });

      if (panError) {
        throw new Error(panError.message);
      }

      const { error } = await supabase.auth.signUp({
        email: signUpEmail.trim().toLowerCase(),
        password: signUpPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes("Account limit reached")) {
          throw new Error("Maximum 2 accounts allowed per email address. Please use a different email.");
        }
        if (error.message.includes("already registered")) {
          throw new Error("This email is already registered. Please sign in instead.");
        }
        throw error;
      }

      toast({
        title: "Account Created!",
        description: "Please check your email to confirm your account before signing in.",
      });
      
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpPan("");
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "An error occurred during sign up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Welcome to MotivWealth</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="signin" className="text-sm px-2">Your Investment Starts Here</TabsTrigger>
            <TabsTrigger value="signup" className="text-sm px-2">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            {!showForgotPassword ? (
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signInEmail}
                    onChange={(e) => {
                      setSignInEmail(e.target.value);
                      setSignInEmailError("");
                    }}
                    required
                    disabled={isLoading}
                    className={signInEmailError ? "border-destructive" : ""}
                    maxLength={255}
                  />
                  {signInEmailError && (
                    <p className="text-sm text-destructive">{signInEmailError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password">Password</Label>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-xs"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => {
                      setSignInPassword(e.target.value);
                      setSignInPasswordError("");
                    }}
                    required
                    disabled={isLoading}
                    className={signInPasswordError ? "border-destructive" : ""}
                  />
                  {signInPasswordError && (
                    <p className="text-sm text-destructive">{signInPasswordError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      setResetEmailError("");
                    }}
                    required
                    disabled={isLoading}
                    className={resetEmailError ? "border-destructive" : ""}
                    maxLength={255}
                  />
                  {resetEmailError && (
                    <p className="text-sm text-destructive">{resetEmailError}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmail("");
                      setResetEmailError("");
                    }}
                  >
                    Back to Sign In
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signUpEmail}
                  onChange={(e) => {
                    setSignUpEmail(e.target.value);
                    setSignUpEmailError("");
                  }}
                  required
                  disabled={isLoading}
                  className={signUpEmailError ? "border-destructive" : ""}
                  maxLength={255}
                />
                {signUpEmailError && (
                  <p className="text-sm text-destructive">{signUpEmailError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Maximum 2 accounts per email address
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signUpPassword}
                  onChange={(e) => {
                    setSignUpPassword(e.target.value);
                    setSignUpPasswordError("");
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  disabled={isLoading}
                  className={signUpPasswordError ? "border-destructive" : ""}
                  minLength={8}
                />
                {signUpPasswordError && (
                  <p className="text-sm text-destructive">{signUpPasswordError}</p>
                )}
                {passwordFocused && signUpPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getStrengthColor(calculatePasswordStrength(signUpPassword))}`}
                          style={{ width: `${calculatePasswordStrength(signUpPassword)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium min-w-[60px]">
                        {getStrengthText(calculatePasswordStrength(signUpPassword))}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-pan">PAN Number</Label>
                <Input
                  id="signup-pan"
                  type="text"
                  placeholder="ABCDE1234F"
                  value={signUpPan}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    setSignUpPan(value);
                    setSignUpPanError("");
                  }}
                  required
                  disabled={isLoading}
                  className={signUpPanError ? "border-destructive" : ""}
                  maxLength={10}
                />
                {signUpPanError && (
                  <p className="text-sm text-destructive">{signUpPanError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Each PAN can only be linked to one email address
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
