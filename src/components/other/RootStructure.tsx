"use client";

import ParentProps from "@/types/common/ParentProps";
import NavigationBar from "@/components/organisms/NavigationBar";

function RootStructure({ children }: Readonly<ParentProps>) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <NavigationBar />
            <main className="w-full grow overflow-auto">
                {children}
            </main>
        </div>
    );
}

export default RootStructure;