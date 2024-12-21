import { signOut, signIn} from "@/auth";
import {LogOut} from "lucide-react";
import React from "react";

type Props = {
    action: 'signOut' | 'signIn',
    title: string
}

const NavButton = async({action, title}: Props) => {

    return (
        <>
            { action === 'signIn' ? (
                <form action={async () => {
                    "use server"
                    await signIn("github")
                }}>
                    <button type="submit">{title}</ button>
                </ form>
            ) : (
                <form action={async () => {
                    "use server"
                    await signOut({redirectTo: "/"})
                }}>
                    <button type="submit">
                        <span className="max-sm:hidden">{title}</span>
                        <LogOut className="size-6 sm:hidden text-red-500 mt-2" />
                    </ button>
                </ form>
            )}
        </>
    );
};

export default NavButton;