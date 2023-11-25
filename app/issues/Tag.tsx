import { CSSProperties } from '@mui/material/styles/createMixins'
import { Status } from '@prisma/client'
import React from 'react'

const tagStyle: Record<Status, CSSProperties> = {
    OPEN: { backgroundColor: "#f5efcb", color: "#6f680cde" },
    CLOSED: { backgroundColor: "#d0d6d7", color: "rgba(0,0,0,0.5)" },
    IN_PROGRESS: { backgroundColor: "#f7a993", color: "white", fontWeight: "regular !important" },
}

const Tag = ({ status }: { status: Status }) => {
    return (
        <div style={{
            fontWeight: "bold",
            borderRadius: 20,
            padding: "3px 15px",
            display: "inline-block",
            ...tagStyle[status]
        }}>
            {status}
        </div>
    )
}

export default Tag