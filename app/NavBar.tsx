"use client";
import { Button, Container } from "@mui/material";
import { tss } from "tss-react/mui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Spacer from "../component/Spacer";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import authSlice from "../redux/slices/authSlice";
import useLoginStatus from "../hooks/useLoginStatus";
import useLogout from "../hooks/useLogout";
import CircularProgress from '@mui/material/CircularProgress';
import { useButtonStyles } from "../styles/styleHooks";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    const dispatch = useAppDispatch();
    const { accessToken, userDetail } = useLoginStatus();
    const [loading, setLoading] = useState(false);
    const { classes, cx } = useButtonStyles({ disabled: loading });
    const isLoggedIn = accessToken !== "";
    const logout = useLogout();

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
            <Container style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>

                    {links.map(link => {
                        const { href, label } = link;
                        const isClicked = currentPath === href;
                        return (
                            <React.Fragment key={href}>
                                <Link
                                    href={href}
                                >
                                    <Button sx={{
                                        fontWeight: isClicked ? "bold" : "regular",
                                    }}>
                                        {label}
                                    </Button>
                                </Link>
                                <Spacer width={10} />
                            </React.Fragment>
                        )
                    })}

                </div>
                {!isLoggedIn && <>
                    <div>
                        <Link href={"/login"} onClick={() => { setLoading(true) }} className={classes.disabled}>
                            <Button> Login </Button>
                        </Link>
                        {loading && <CircularProgress size={14} style={{ marginLeft: 4 }} />}
                    </div>
                </>}
                {isLoggedIn && <div style={{ fontSize: 12 }}>
                    <span style={{
                        border: "1px solid rgba(0,0,0,0.2)",
                        padding: "6px 8px",
                        borderRadius: 4,
                        marginRight: 4,
                    }}>
                        {userDetail?.email}
                    </span>
                    <Button onClick={logout}>Logout</Button>
                </div>}
            </Container>
        </div >
    )
}

export default NavBar