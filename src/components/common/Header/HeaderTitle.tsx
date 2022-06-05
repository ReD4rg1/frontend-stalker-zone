interface Props {
    text: string | null
    maxWidth?: number
}

const HeaderTitle = ({text, maxWidth}: Props) => {

    return (
        <h2 style={maxWidth
            ? {
                fontWeight: 600,
                maxWidth: `${maxWidth}px`,
                textOverflow: "ellipsis",
                overflow: "hidden",
            }
            : {fontWeight: 600}}>
            {text}
        </h2>
    )
}

export default HeaderTitle
