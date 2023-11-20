"use client";
import { Container } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"
import { IoBugSharp } from "react-icons/io5";
import classnames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]


    return (
        <div style={{
            height: 42,
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
        }}
            className="border-b"
        >
            <Container className="flex space-x-6">
                <Link href="/" className="items-center"><IoBugSharp /></Link>
                <ul className="flex space-x-6">
                    {links.map(link => {
                        const { href, label } = link;
                        return (
                            <li>
                                <Link
                                    key={href}
                                    className={
                                        classnames({
                                            "text-zinc-900": href === currentPath,
                                            "text-zinc-500": href !== currentPath,
                                            "hover:text-zinc-800 transition-colors": true
                                        })
                                    }
                                    href={href}
                                >
                                    {label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </Container>
        </div>
    )
}

export default NavBar