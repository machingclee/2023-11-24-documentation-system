import { tss } from "tss-react/mui";

export const useButtonStyles = tss
    .withParams<{ disabled: boolean }>()
    .create(({ disabled }) => ({
        disabled: {
            opacity: disabled ? 0.5 : 1,
            pointerEvents: disabled ? "none" : "auto"
        }
    }))
