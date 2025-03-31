'use client'

import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import cities from '@/data/cities.json';
import useViewport from '@/hooks/useViewport';

export default function Search() {

    const [value, setValue] = React.useState<string>('');
    const [suggest, setSuggest] = React.useState<string[]>([]);
    const { isMobile } = useViewport();

    const {replace} = useRouter();

    const isCyrillic = (text: string) => /[а-яА-ЯЁё]/.test(text);
    const isLatin = (text: string) => /[a-zA-Z]/.test(text);

    const searchCity = (cityName: string) => {
      
      return cities.filter((city: any) => { 
        let result = [];
        if(isCyrillic(cityName)){
          result = city.city_cyrillic.toLowerCase().includes(cityName.toLowerCase());
        } else if(isLatin(cityName)){
          result = city.city.toLowerCase().includes(cityName.toLowerCase());
        }
        return result;
      });
    };

      const handleCitySelect = (value: string) => {
        setValue(value);
        const url = value.replace(/\s+/g, '-');
        replace(`${url}`);
      };

      const handleInputChange = (event: React.SyntheticEvent, newValue: string | null) => {
        if (newValue && newValue.length >= 2) {
          setValue(newValue);
          const results = searchCity(newValue);
          setSuggest(results.map(city => {
            return isCyrillic(newValue) ? city.city_cyrillic : city.city;
          }));
        } else {
          setSuggest([]);
        }
      };

      const handleOptionChange = (event: React.SyntheticEvent, newValue: string | null) => {
        if(newValue){
          handleCitySelect(newValue);
        }
      };

    return (
            <div className='grid grid-cols-12'>
                <div className='col-span-8'>
                  <Autocomplete
                  id="search"	
                  options={suggest}
                  onInputChange={handleInputChange}	
                  onChange={handleOptionChange}
                  getOptionLabel={(option: string) => option}
                  freeSolo
                  renderInput={(params) => (<TextField {...params} label="" placeholder="Град" variant="outlined" />)}
    />
                  
                </div>
                  <Button variant="contained" className='col-span-4' onClick={() => handleCitySelect(value)} startIcon={<SearchIcon />}>
                  Търси
                </Button>
            </div>
    )
}