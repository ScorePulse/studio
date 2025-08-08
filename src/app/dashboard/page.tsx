'use client';
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-background border-b p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <UserButton afterSignOutUrl="/" />
            </header>
            <main className="flex-grow p-8">
                <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard!</h2>
                <p>This is a protected page.</p>
            </main>
        </div>
    )
}
