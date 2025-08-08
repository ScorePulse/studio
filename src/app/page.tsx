'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import React from 'react';

const PawCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
        <path d="M14.5 13.04c-1.33 0-2.5.6-3.5 1.74-1-.81-2.5-1.74-4-1.74-2.21 0-4 1.79-4 4v2h8.5c0-1.66-1.34-3-3-3s-3 1.34-3 3h-1.5c-1.1 0-2-.9-2-2 0-1.1.9-2 2-2s2 .9 2 2H11c0-2.21-1.79-4-4-4-1.38 0-2.61.7-3.32 1.76" />
        <path d="M21 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        <path d="M9.5 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S10.33 6.5 9.5 6.5z" />
    </svg>
);


const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M48 24.54C48 22.76 47.84 21.14 47.54 19.64H24V28.36h13.44c-.58 3.56-2.4 6.6-5.32 8.62v5.7h7.32c4.28-3.96 6.74-9.82 6.74-16.78z" fill="#4285F4"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M24 48c6.5 0 11.98-2.14 15.98-5.82l-7.32-5.7c-2.16 1.44-4.92 2.3-8.66 2.3-6.66 0-12.3-4.48-14.32-10.48H2.18v5.88C6.14 42.62 14.42 48 24 48z" fill="#34A853"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.68 28.74c-.54-1.62-.86-3.34-.86-5.12s.32-3.5.86-5.12V12.64H2.18C.8 15.24 0 18.46 0 22.02c0 3.56.8 6.78 2.18 9.38l7.5-5.88z" fill="#FBBC05"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M24 9.48c3.44 0 6.6.96 9.08 3.36l6.5-6.5C35.94 2.18 30.46 0 24 0 14.42 0 6.14 5.38 2.18 12.64l7.5 5.88C11.7 12.56 17.34 8.08 24 8.08z" fill="#EA4335"/>
    </svg>
);

const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.25,12.04a5,5,0,0,1-1.89,3.8,5.16,5.16,0,0,1-3.36,1.41,4,4,0,0,1-1.28-.22,4.43,4.43,0,0,0-1.46-.29c-1.3,0-2.58.74-3.51.74a5.21,5.21,0,0,1-3.4-1.45,5.4,5.4,0,0,1-1.9-3.72,5.77,5.77,0,0,1,3.32-5.11,4.82,4.82,0,0,1,3.12-.4,4.53,4.53,0,0,1,1.83.35,3.4,3.4,0,0,0,1.21.28,3.26,3.26,0,0,0,1.21-.29,3.52,3.52,0,0,0-1.87-3.12,6.1,6.1,0,0,0-2-.76,1.52,1.52,0,0,1-.52-1,3.69,3.69,0,0,1,.84-2.48A4.45,4.45,0,0,1,12.53,2a4.23,4.23,0,0,1,2.5,1,4.2,4.2,0,0,0-.31,2.83,4,4,0,0,1,2.69,3.66,5.3,5.3,0,0,1-3.2,4.87,4.8,4.8,0,0,1,2,.24A4.89,4.89,0,0,1,19.25,12.04Z"/>
    </svg>
);

const MicrosoftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 3.5H3.5v8h8v-8zM20.5 3.5h-8v8h8v-8zM11.5 12.5H3.5v8h8v-8zM20.5 12.5h-8v8h8v-8z"/>
    </svg>
);


export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2">
                <PawCloudIcon />
                <span className="text-xl font-bold tracking-tighter">pawcloud</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Log In</h1>
          
          <div className="space-y-5 mt-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Email address" required className="pl-10"/>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                required 
                className="pl-10 pr-10"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <div className="text-right mt-4">
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full mt-6 text-base font-semibold">
            Log In
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="space-y-3">
              <Button variant="outline" className="w-full text-base font-medium justify-start gap-4">
                  <AppleIcon /> Continue with Apple
              </Button>
              <Button variant="outline" className="w-full text-base font-medium justify-start gap-4">
                  <GoogleIcon /> Continue with Google
              </Button>
              <Button variant="outline" className="w-full text-base font-medium justify-start gap-4">
                  <MicrosoftIcon /> Continue with Microsoft
              </Button>
          </div>
          
          <div className="mt-8 text-center text-sm">
            Dont have an account?{' '}
            <Link href="#" className="underline text-primary font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-12 relative rounded-l-3xl">
        <Button variant="outline" className="absolute top-8 right-8 bg-white shadow-md">
            Save up to 30% with Pro Plan
        </Button>
        <div className="text-center">
            <Image
                src="https://placehold.co/450x340.png"
                alt="Data Platform Illustration"
                width={450}
                height={340}
                className="mb-8"
                data-ai-hint="data platform isometric"
            />
            <h2 className="text-3xl font-bold mb-3">Leading data platform</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
                Give your team access to business insights. Access to all your data in one platform.
            </p>
        </div>
      </div>
    </div>
  );
}
