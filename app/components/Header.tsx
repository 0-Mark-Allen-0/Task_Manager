"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SignInButton from "./SignInButton";

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-lime-300/75 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 z-50 w-[90%] max-w-4xl">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold ">
          Task Manager
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <SignInButton />
        </div>

        {/* Mobile Menu Button */}
      </nav>
    </header>
  );
}
