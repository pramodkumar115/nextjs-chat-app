// /app/NavLink.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const NavLink = ({
 href,
 children,
}: {
 href: string,
 children: React.ReactNode,
}) => {
 const segment = useSelectedLayoutSegment();
 const active = `/${segment}` === href;

 return (
  <Link className={active ? 'underline' : ''} href={href}>
   {children}
  </Link>
 );
}

export default NavLink;
