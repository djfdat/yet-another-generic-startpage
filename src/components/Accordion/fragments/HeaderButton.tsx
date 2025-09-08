import { PropsWithChildren } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Disclosure } from "@headlessui/react"
import { ChevronDown, ChevronRight } from "react-feather"

import { useFontSize } from "../../../Providers"

const Button = styled(Disclosure.Button)(({ theme: { color, space } }) => {
  const fontSize = useFontSize()
  return css`
    font-size: ${fontSize}rem;
    width: 100%;
    height: 4rem;

    display: flex;
    align-items: center;

    cursor: pointer;
    border: none;
    background: transparent;
    color: inherit;

    :hover {
      background: ${color.bg.highlight};
    }

    :focus-visible {
      background: ${color.bg.highlight};
      outline: ${space.smallest} solid ${color.fg.shade};
    }
  `
})

const CaretLayout = styled.span`
  ${({ theme: { space } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${space.largest};
  `}
`

interface HeaderButtonProps {
  open: boolean
  label?: string
}

export const HeaderButton = ({
  open,
  label,
  children,
}: PropsWithChildren<HeaderButtonProps>) => {
  return (
    <Button aria-label={`Expand ${label || "accordion"}`}>
      <CaretLayout>{open ? <ChevronDown /> : <ChevronRight />}</CaretLayout>
      {children}
    </Button>
  )
}
