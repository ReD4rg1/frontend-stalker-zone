interface Props {
    text: string | null
}

const HeaderTitle = ({text}: Props) => {

    return (
        <h2 style={{fontWeight: 600}}>
            {text}
        </h2>
    )
}

export default HeaderTitle
