import NavbarLink from "./navbarLink"
import Button from "@mui/material/Button"
import style from './navbar.module.css'
import { Claims } from "@auth0/nextjs-auth0"
import { User } from "@prisma/client"

interface Props {
    links: NavbarLink[]
    user?: User
}

export default async function NavbarDesktopView({ links, user }: Props) {
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