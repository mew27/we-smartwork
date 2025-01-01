import candaLetterSVG from "./assets/Canda_Letter.svg"
import { css, keyframes } from "@emotion/react"

const LogoBackgroundCss = (size: number) => css({
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: "rgb(9, 65, 206)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
})

const LogoAnim = keyframes({
    "from": {
        transform: "rotate(0deg) translate(-20%, 0%)"
    }
})

const LogoLetterCss = (size: number, animate: boolean) => css({
    position: "absolute",
    width: size,
    height: size * 0.9,
    transform: "translate(5%, 20%)",
    animation: animate ? `1s ${LogoAnim}` : "",
})

interface CandaLogoProps {
    animate?: boolean,
    size?: number,
}

const CandaLogo = ({ animate, size }: CandaLogoProps) => {
    const defaultSize = 32
    const backgroundSize = size ?? defaultSize
    const letterSize = backgroundSize * 0.6

    return (<>
        <div css={LogoBackgroundCss(backgroundSize)}>

            {/* Letter C */}
            <img css={[LogoLetterCss(letterSize, animate ?? false),
            css({ transform: "translate(5%, 20%)" })]}
                src={candaLetterSVG} />

            {/* Letter A */}
            <img css={[LogoLetterCss(letterSize, animate ?? false),
            css({ transform: "rotate(90deg) translate(-20%, 0%)" })]}
                src={candaLetterSVG} />
        </div>
    </>)
}

export default CandaLogo