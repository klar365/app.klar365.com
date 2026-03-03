import cspPolicy from "@/utils/csp-policy";

import { NextConfig } from "next";

function nextConfig(): NextConfig {
    return {
        headers: () => [
            {
                source: "/(.*)",
                headers: [{
                    key: "Content-Security-Policy",
                    value: cspPolicy
                }]
            },
            {
                source: "/(.*)",
                headers: [{
                    key: "X-Powered-By",
                    value: "Klar365"
                }]
            }
        ],
        poweredByHeader: false
    };
}

export default nextConfig;
