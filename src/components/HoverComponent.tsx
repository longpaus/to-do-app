import {ReactNode, useEffect, useState} from "react";

interface HoverComponentProps {
    children?: ReactNode;
    hoverBody: ReactNode;
}

export default function HoverComponent({children, hoverBody}: HoverComponentProps) {
    const [hover, setHover] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (hover) {
            const timeoutId = setTimeout(() => {
                setVisible(true);
            }, 500);
            return () => clearTimeout(timeoutId);
        } else {
            setVisible(false);
        }
    }, [hover]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div>{children}</div>
            {visible && <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-black ">{hoverBody}</div>}
        </div>
    )
}