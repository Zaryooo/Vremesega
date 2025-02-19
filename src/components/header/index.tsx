import Search from '../search';

export default function Header() {
    return (
        <>
        <div className='container'>
          <div className='wrapper raund flex'>
            <div className='logo-wrapper flex items-center flex-1'>
              <h1 className='logo text-[40px] italic font-bold super-shiny tracking-widest'>Vremesega</h1>
            </div>
            <div className='search-bar'>
              <Search /> 
            </div>
          </div>
        </div>
        
        </>
    )

}
