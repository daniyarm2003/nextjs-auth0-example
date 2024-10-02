import NavbarLink from "./navbarLink"
import Button from "@mui/material/Button"
import style from './navbar.module.css'
import { Claims, getSession } from "@auth0/nextjs-auth0"

interface Props {
    links: NavbarLink[]
    user?: Claims
}

export default async function NavbarDesktopView({ links }: Props) {
    const session = await getSession()
    const user = session?.user

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