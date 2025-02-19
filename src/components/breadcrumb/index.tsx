interface BreadcrumbProps {
    title?: string;
    children?: React.ReactNode
}

export default function Breadcrumb({title, children}: BreadcrumbProps) {

  return (
    <>
      <div className='breadcrumb relative'>
        <div className='container mx-auto p-5'>
          <h1 className='text-center text-3xl font-bold mt-7 mb-2'>{title ? title.charAt(0).toUpperCase() + title.slice(1) : ''}</h1>
          <div className='mx-auto text-center'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
