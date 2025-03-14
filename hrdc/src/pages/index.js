// pages/index.js
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import SearchResults from "./api/searchresults";

export default function Home() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-[var(--whitebg-color)] text-[var(--black)] relative">
            {/* Top left: HRDC logo */}
            <div className="absolute top-4 left-4">
                <Link href="/profile">
                    <Image
                        src="/horizontal-1-color-HRDC-logo.svg"
                        alt="HRDC Logo"
                        width={160}
                        height={200}
                        className="cursor-pointer"
                        priority
                    />
                </Link>
            </div>

            {/* Top right: Login link - always available for account switching */}
            <div className="absolute top-4 right-4">
                <Link href="/login">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/person.svg"
                            alt="Login/Account"
                            width={40}
                            height={40}
                            className="cursor-pointer"
                            priority
                        />
                        <span
                            className="text-white text-sm mt-1"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                        >
                            {user ? (user.displayName || user.email.split('@')[0]) : "Login"}
                        </span>
                    </div>
                </Link>
            </div>

            <header
                className="w-full py-6 flex flex-col items-center"
                style={{backgroundColor: "var(--primary)"}}
            >
                <Image
                    src="/logo.png"
                    alt="HRDC Logo"
                    width={100}
                    height={50}
                    priority
                />
                <h1
                    className="mt-2"
                    style={{
                        fontFamily: "var(--primary-header-font-family)",
                        fontWeight: "var(--primary-header-font-weight)",
                        fontSize: "var(--primary-header-font-size)",
                        color: "var(--whitebg-color)",
                        letterSpacing: "var(--primary-header-letter-spacing)",
                        lineHeight: "var(--primary-header-line-height)",
                        fontStyle: "var(--primary-header-font-style)",
                    }}
                >
                    EMPLOYEE RESOURCES
                </h1>
            </header>

            <section
                className="mt-8 p-6 rounded-lg shadow-md w-3/4 max-w-lg text-center"
                style={{backgroundColor: "var(--secondary-gold)"}}
            >
                <h2
                    className="mb-4"
                    style={{
                        fontFamily: "var(--h-2-font-family)",
                        fontWeight: "var(--h-2-font-weight)",
                        fontSize: "var(--h-2-font-size)",
                        color: "var(--whitebg-color)",
                        letterSpacing: "var(--h-2-letter-spacing)",
                        lineHeight: "var(--h-2-line-height)",
                        fontStyle: "var(--h-2-font-style)",
                    }}
                >
                    QUICK LINKS
                </h2>
                <div className="space-y-4">
                    <button
                        className="block w-full py-2 rounded-lg text-lg font-medium hover:bg-[var(--primary)]"
                        style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--whitebg-color)",
                        }}
                    >
                        Important Files
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className="block w-full py-2 rounded-lg text-lg font-medium hover:bg-[var(--primary)]"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--whitebg-color)",
                            }}
                        >
                            Modify Documents
                        </button>
                        {isDropdownOpen && (
                            <div
                                className="absolute left-0 w-full shadow-lg rounded-md mt-1"
                                style={{
                                    backgroundColor: "var(--whitebg-color)",
                                    border: "1px solid var(--secondary-blue)",
                                    color: "var(--black)",
                                }}
                            >
                                {["Create", "Edit", "Delete"].map((action, index) => (
                                    <button
                                        key={index}
                                        className="block w-full text-left px-4 py-2 hover:bg-[var(--faded-white-for-cards)]"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="block w-full py-2 rounded-lg text-lg font-medium hover:bg-[var(--primary)]"
                        style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--whitebg-color)",
                        }}
                    >
                        User Privileges
                    </button>
                    <button
                        className="block w-full py-2 rounded-lg text-lg font-medium hover:bg-[var(--primary)]"
                        style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--whitebg-color)",
                        }}
                    >
                        Document Directory
                    </button>
                </div>
            </section>

            <section className="mt-10 text-center">
                <div
                    className="font-medium"
                    style={{
                        color: "var(--black)",
                        fontFamily: "var(--primary-subheader-font-family)",
                        fontWeight: "var(--primary-subheader-font-weight)",
                        fontSize: "var(--primary-subheader-font-size)",
                        letterSpacing: "var(--primary-subheader-letter-spacing)",
                        lineHeight: "var(--primary-subheader-line-height)",
                        fontStyle: "var(--primary-subheader-font-style)",
                    }}
                >
                    Can't find what you are looking for?
                </div>
                <SearchResults />
            </section>
        </div>
    );
}