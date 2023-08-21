export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto w-full md:w-3/4 lg:w-2/4 p-4 min-h-full'>
        {children}
    </div>
  )
}
