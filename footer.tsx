import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 align-middle">
          <h2 className="font-bold text-4xl">Gastro</h2>
          <QuickLinks />
          <ContactUs />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

const SocialLinks: React.FC = () => (
  <div className="flex space-x-4">
    <Link href="#">
      <Github className="h-6 w-6" />
    </Link>
    <Link href="#">
      <Twitter className="h-6 w-6" />
    </Link>
    <Link href="#">
      <Linkedin className="h-6 w-6" />
    </Link>
  </div>
);

const QuickLinks: React.FC = () => (
  <ul className="space-y-2">
    <li>
      <Link href="#features" className="text-sm hover:underline">
        Features
      </Link>
    </li>
    <li>
      <Link href="#how-it-works" className="text-sm hover:underline">
        How It Works
      </Link>
    </li>
    <li>
      <Link href="#testimonials" className="text-sm hover:underline">
        Testimonials
      </Link>
    </li>
    <li>
      <Link href="#faq" className="text-sm hover:underline">
        FAQ
      </Link>
    </li>
  </ul>
);

const ContactUs: React.FC = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
    <SocialLinks />
  </div>
);

const Copyright: React.FC = () => (
  <div className="mt-8 pt-8 border-t  text-center">
    <p>&copy; 2025 Gastro. All rights reserved.</p>
  </div>
);
