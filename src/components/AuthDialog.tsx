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
  const [signInEmailError, setSignInEmailError] = useState("");
  const [signInPasswordError, setSignInPasswordError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState("");
  const { toast } = useToast();

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

    const isEmailValid = validateEmail(signUpEmail, setSignUpEmailError);
    const isPasswordValid = validatePassword(signUpPassword, setSignUpPasswordError, true);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
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
        description: "Your account has been created successfully. You can now sign in.",
      });
      
      setSignUpEmail("");
      setSignUpPassword("");
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Welcome to MotivWealth</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
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
                <Label htmlFor="signin-password">Password</Label>
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
                  required
                  disabled={isLoading}
                  className={signUpPasswordError ? "border-destructive" : ""}
                  minLength={8}
                />
                {signUpPasswordError && (
                  <p className="text-sm text-destructive">{signUpPasswordError}</p>
                )}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium">Password must contain:</p>
                  <ul className="list-disc list-inside pl-2 space-y-0.5">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter (A-Z)</li>
                    <li>One lowercase letter (a-z)</li>
                    <li>One number (0-9)</li>
                    <li>One special character (!@#$%^&*)</li>
                  </ul>
                </div>
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
