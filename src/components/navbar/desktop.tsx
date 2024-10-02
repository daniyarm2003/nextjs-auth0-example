import NavbarLink from "./navbarLink";
import Button from "@mui/material/Button";

import { useUser } from "@auth0/nextjs-auth0/client";

import style from './navbar.module.css'


interface Props {
    links: NavbarLink[]
}

export default function NavbarDesktopView({ links }: Props) {
    const { user } = useUser()

    const shouldDisplayLink = (link: NavbarLink) => {
        return !link.authorizedOnly || user !== undefined
    }

    return (
        <>
            {links.filter(shouldDisplayLink).map(link => (
                <Button key={link.name} color='inherit' href={link.link} className={style['nav-link-button']}>{link.name}</Button>
            ))}
        </>
    )
}