export default function registerLayout({children}: {children: React.ReactNode}) {
    return <div className="w-full lg:w-2/4 mx-auto min-h-full">
        {children}
    </div>
}