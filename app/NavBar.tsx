"use client";
import { Button, Container } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"
import { IoBugSharp } from "react-icons/io5";
import classnames from "classnames";
import Spacer from "@/component/Spacer";

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
            borderBottom: "1px solid rgba(0,0,0,0.1)"
        }}
        >
            <Container >
                <div style={{ display: "flex" }}>
                    {links.map(link => {
                        const { href, label } = link;
                        const isClicked = currentPath === href;
                        return (
                            <>
                                <Link
                                    key={href}
                                    href={href}
                                >
                                    <Button sx={
                                        {
                                            fontWeight: isClicked ? "bold" : "regular",

                                        }
                                    }>
                                        {label}
                                    </Button>
                                </Link>
                                <Spacer width={10} />
                            </>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default NavBar