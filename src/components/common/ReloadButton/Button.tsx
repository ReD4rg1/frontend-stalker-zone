import {CSSProperties} from "react";
import styles from "./ReloadButton.module.css";

type ButtonType = "common" | "invert"

const types: Record<ButtonType, string> = {
    common: styles.button,
    invert: styles.buttonInvert,
}

interface Props {
    text?: string
    type: ButtonType
    style?: CSSProperties
    className?: string
    onClick: (props: any) => void
}

const Button = ({
   text = "Обновить",
   type,
   style,
   className,
   onClick
}: Props) => (
    <button
        style={style}
        className={className ?? types[type]}
        onClick={onClick}
    >
        {text}
    </button>
)

export default Button
