interface Props {
    children: React.ReactNode
}

export default function TestLayout({ children }: Readonly<Props>) {
    return (
        <div>
            {children}
        </div>
    )
}