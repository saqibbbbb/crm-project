import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // bcrypt ships a native .node binary and mongoose relies on dynamic
  // requires — both break if Next bundles them for serverless functions.
  serverExternalPackages: ["bcrypt", "mongoose"],
};

export default nextConfig;
