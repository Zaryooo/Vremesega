'use client'

import Search from '../search';

interface BreadcrumbProps {
    title?: string;
    children?: React.ReactNode
}

export default function Header({title, children}: BreadcrumbProps) {
    return (
        <>
        <div className='container'>
          <div className='wrapper raund flex'>
            <div className='logo-wrapper flex items-center flex-1'>
              <h1 className='logo text-[30px] italic font-bold super-shiny'>Vremesega</h1>
            </div>
            <div className='search-bar'>
              <Search /> 
            </div>
          </div>
        </div>
        
        </>
    )

}
