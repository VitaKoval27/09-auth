interface NotesLayoutProps {
    children: React.ReactNode,
    sidebar?: React.ReactNode
}
export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
    return (
        <div>
            <aside>{sidebar}</aside>
            <div>{children}</div>

        </div>
    )
}