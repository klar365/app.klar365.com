import cspPolicy from "@/utils/csp-policy";

import { NextConfig } from "next";

function nextConfig(): NextConfig {
    return {
        reactCompiler: true,
        headers: () => [{
            source: "/(.*)",
            headers: [{
                key: "Content-Security-Policy",
                value: cspPolicy
            }]
        }]
    };
}

export default nextConfig;
