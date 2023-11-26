import { CircularProgress } from '@mui/material';
import Button, { ButtonProps } from '@mui/material-next/Button';
import { PropsWithChildren, ReactNode } from 'react';
import { useButtonStyles } from '../styles/styleHooks';

export default (props: { children: ReactNode, isLoading?: boolean } & ButtonProps) => {
    const { onClick, className, children, isLoading = false, ..._props } = props;
    const { classes, cx } = useButtonStyles({ disabled: isLoading || false });
    return (
        <Button
            onClick={onClick}
            {..._props}
            className={cx(className, classes.disabled)}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                {children}
                {isLoading && <CircularProgress size={16} style={{ color: "white", marginLeft: 10, marginBottom: 2 }} />}
            </div>
        </Button>
    )
}