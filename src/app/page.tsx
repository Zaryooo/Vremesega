import ErrorComponent from '@/components/error-component';
import CityPage from './[city]/page';

export default function Home() {
  
  return (
    <CityPage params={Promise.resolve({ city: 'Sofia' })} />
    //<ErrorComponent/>
  )
}
