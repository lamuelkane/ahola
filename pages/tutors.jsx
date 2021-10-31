
import Header2 from '../components/Header2'
import {teachers} from '../components/lists'
import Autoselect from '../components/Autoselect'
import Tutorprofile from '../components/Tutorprofile'
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from '../styles/Tutor.module.css'
import Sort from '../components/Sort'
import Pagination from '@mui/material/Pagination'
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Filters from '../components/Filters'
import { Fragment, useState, useEffect } from 'react'
import React, { useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Sidefilters from '../components/Sidefilters'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import Tutorpopup from '../components/Tutorpopup';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Tutors = () => {
    const [openfilters, setOpenfilters] = useState(false)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const [open, setOpen] = useState(false)
    const [teach, setteacher] = useState({})


      const changeHandler = value => {
        setValue(value)
      }


      useEffect(() => {
        console.log(options)
      }, [options])
           
    return (
        <div>
          <Tutorpopup open={open} setOpen={setOpen} teacher={teach} />
          <div className="border">
            <Header2 />
          </div>
          <div className={`bg-gray-300`}>
            <div className="flex nowrap align-center justify-between  py-1.5 w-80 margin-auto">
              <div className={`${styles.autoselect}`}><Autoselect /></div>
              <div className={`flex align-center`}><input type="number" placeholder='start price' className={`${styles.priceinput}`} /> <span>to</span> <input placeholder='end price' type="number" className={`${styles.priceinput}`} /></div>
              <Chip label="Native speaker" size='medium' variant="outlined" color="primary" />
              <Sort />
            <div className={`${styles.searchinputwrapper}`}>
                  <SearchIcon />
                 <input type="search" placeholder='search tutor' name="" id="" className={`${styles.searchinput} focus:outline-none`} />
            </div>
            </div>   
            {/* <Sidefilters />
            <Chip label="Native speaker" size='medium' variant="outlined" color="primary" />
            <Chip label="Filters" icon={<FilterListIcon />} size='medium' variant="outlined" color="primary" /> */}
          </div>
          <div className={`bg-gray-100`}>
          <div className={`center bg-indigo-400 py-10`}>
            <h2 className={`text-2xl text-indigo-700`}>Find the best tutor for you</h2>
            <p className={`text-sm`}>Find the best English teacher for you: choose from our experienced English teachers online and get the best learning experience.</p>
          </div>
          <div className={`flex justify-center align-center`}>
            <div className={`flex justify-center align-center ${styles.tutorprofileswraper} column w-4/5`}>
               {
                teachers.map((teacher, i) => (
                   <Tutorprofile key={i} open={open} teacher={teacher} setOpen={setOpen} setteacher={setteacher} />
                 ))
               }
            </div>
          </div>
          </div>
        </div>
    )
}

export default Tutors
