import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import motivwealthLogo from "@/assets/motivwealth-logo.png";

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
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
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
        description: "Redirecting to your portfolio...",
      });
      
      setSignInEmail("");
      setSignInPassword("");
      onOpenChange(false);
      
      // Redirect to InvestWell portal after successful login
      window.location.href = "https://motivewealth.investwell.app";
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
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        <Tabs defaultValue="signin" className="w-full">
          <TabsContent value="signin" className="m-0">
            {!showForgotPassword ? (
              <div className="p-8 pt-10">
                {/* Logo and Welcome */}
                <div className="flex flex-col items-center mb-8">
                  <img 
                    src={motivwealthLogo} 
                    alt="MotivWealth" 
                    className="h-16 w-auto mb-4"
                  />
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-foreground text-center">
                      Welcome!
                    </DialogTitle>
                  </DialogHeader>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* Username/Email field with underline style */}
                  <div className="space-y-1">
                    <Label 
                      htmlFor="signin-email" 
                      className={`text-sm transition-colors ${signInEmail ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      Username
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => {
                        setSignInEmail(e.target.value);
                        setSignInEmailError("");
                      }}
                      required
                      disabled={isLoading}
                      className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                        signInEmailError ? "border-destructive" : "border-muted"
                      }`}
                      maxLength={255}
                    />
                    {signInEmailError && (
                      <p className="text-sm text-destructive">{signInEmailError}</p>
                    )}
                  </div>

                  {/* Password field with underline style and eye toggle */}
                  <div className="space-y-1">
                    <Label 
                      htmlFor="signin-password" 
                      className="text-sm text-muted-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showSignInPassword ? "text" : "password"}
                        value={signInPassword}
                        onChange={(e) => {
                          setSignInPassword(e.target.value);
                          setSignInPasswordError("");
                        }}
                        required
                        disabled={isLoading}
                        className={`border-0 border-b-2 rounded-none px-0 pr-10 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                          signInPasswordError ? "border-destructive" : "border-muted"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showSignInPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {signInPasswordError && (
                      <p className="text-sm text-destructive">{signInPasswordError}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember-me" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label 
                        htmlFor="remember-me" 
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Remember Me
                      </label>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium rounded-lg bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>

                  {/* Terms notice */}
                  <p className="text-center text-xs text-muted-foreground">
                    By logging in, you confirm acceptance of our{" "}
                    <a href="#" className="text-primary hover:underline">Terms of Use</a>.
                  </p>

                  {/* OR divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-4 text-muted-foreground">OR</span>
                    </div>
                  </div>

                  {/* Alternative login options */}
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 border-muted hover:bg-muted/50"
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Log in with OTP
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 border-muted hover:bg-muted/50"
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Sign in with Google
                    </Button>
                  </div>
                </form>

                {/* Switch to Sign Up */}
                <div className="mt-6 pt-6 border-t border-muted">
                  <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/30 p-1 rounded-lg">
                    <TabsTrigger 
                      value="signin" 
                      className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup" 
                      className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
            ) : (
              <div className="p-8 pt-10">
                {/* Logo and header for forgot password */}
                <div className="flex flex-col items-center mb-8">
                  <img 
                    src={motivwealthLogo} 
                    alt="MotivWealth" 
                    className="h-16 w-auto mb-4"
                  />
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-foreground text-center">
                      Reset Password
                    </DialogTitle>
                  </DialogHeader>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="space-y-1">
                    <Label 
                      htmlFor="reset-email" 
                      className={`text-sm transition-colors ${resetEmail ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      Email
                    </Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        setResetEmailError("");
                      }}
                      required
                      disabled={isLoading}
                      className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                        resetEmailError ? "border-destructive" : "border-muted"
                      }`}
                      maxLength={255}
                    />
                    {resetEmailError && (
                      <p className="text-sm text-destructive">{resetEmailError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium rounded-lg bg-primary hover:bg-primary/90"
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
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="signup" className="m-0">
            <div className="p-8 pt-10">
              {/* Logo and Welcome for Sign Up */}
              <div className="flex flex-col items-center mb-8">
                <img 
                  src={motivwealthLogo} 
                  alt="MotivWealth" 
                  className="h-16 w-auto mb-4"
                />
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-foreground text-center">
                    Create Account
                  </DialogTitle>
                </DialogHeader>
              </div>

              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-1">
                  <Label 
                    htmlFor="signup-email" 
                    className={`text-sm transition-colors ${signUpEmail ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                      setSignUpEmailError("");
                    }}
                    required
                    disabled={isLoading}
                    className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                      signUpEmailError ? "border-destructive" : "border-muted"
                    }`}
                    maxLength={255}
                  />
                  {signUpEmailError && (
                    <p className="text-sm text-destructive">{signUpEmailError}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label 
                    htmlFor="signup-password" 
                    className="text-sm text-muted-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                      setSignUpPasswordError("");
                    }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    disabled={isLoading}
                    className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                      signUpPasswordError ? "border-destructive" : "border-muted"
                    }`}
                    minLength={8}
                  />
                  {signUpPasswordError && (
                    <p className="text-sm text-destructive">{signUpPasswordError}</p>
                  )}
                  {passwordFocused && signUpPassword && (
                    <div className="space-y-2 mt-2">
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
                <div className="space-y-1">
                  <Label 
                    htmlFor="signup-pan" 
                    className={`text-sm transition-colors ${signUpPan ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    PAN Number
                  </Label>
                  <Input
                    id="signup-pan"
                    type="text"
                    value={signUpPan}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                      setSignUpPan(value);
                      setSignUpPanError("");
                    }}
                    required
                    disabled={isLoading}
                    className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent ${
                      signUpPanError ? "border-destructive" : "border-muted"
                    }`}
                    maxLength={10}
                  />
                  {signUpPanError && (
                    <p className="text-sm text-destructive">{signUpPanError}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Each PAN can only be linked to one email address
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium rounded-lg bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>

              {/* Switch to Sign In */}
              <div className="mt-6 pt-6 border-t border-muted">
                <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/30 p-1 rounded-lg">
                  <TabsTrigger 
                    value="signin" 
                    className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
