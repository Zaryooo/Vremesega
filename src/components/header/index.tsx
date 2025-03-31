import Search from '../search';

export default function Header() {
    return (
        <>
        <div className='container'>
          <div className='wrapper raund grid md:grid-cols-5 gap-3'>
            <div className='logo-wrapper flex items-center flex-1 md:col-span-3'>
              <h1 className='logo text-[40px] italic font-bold super-shiny tracking-widest'>Vremesega</h1>
            </div>
            <div className='search-bar md:col-span-2'>
              <Search /> 
            </div>
          </div>
        </div>
        
        </>
    )

}
