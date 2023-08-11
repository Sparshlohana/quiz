'use client'

import React, { use, useEffect, useState } from 'react';
import Select from 'react-select';
import NextArrow from '../components/Icons';
import { useThemeContext } from '../context/context';
import Link from 'next/link';

const Page = () => {
    const [categoryArray, setCategoryArray] = useState([]);

    const { selectedCategory, setSelectedCategory, modeType, setModeType, numberOfQuestion, setNumberOfQuestion } = useThemeContext();

    useEffect(() => {
        handleFetchCategories();
    }, [])

    const handleFetchCategories = async () => {
        const categoriesData = await fetch('https://opentdb.com/api_category.php')
            .then((res) => res.json())
            .then((data) => data.trivia_categories)
            .catch((err) => console.log(err));
        const newArr = categoriesData.map((category) => {
            return { value: category.id, label: category.name }
        });
        setCategoryArray(newArr);
    }

    const numberOfQuestionsArray = [
        { value: 5, label: 5 },
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 },
        { value: 30, label: 30 },
        { value: 50, label: 50 },
    ]

    const options = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
    ];

    // Define styles for dark mode
    const darkModeStyles = {
        control: styles => ({
            ...styles, backgroundColor: '#c7c7c7', color: 'black'
        }),
        option: (styles, { isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? '#adadad' : '#adadad',
                color: isSelected ? 'black' : 'inherit',
                ':hover': {
                    backgroundColor: '#979797', // Change background color on hover
                },

            };
        },
        singleValue: styles => ({ ...styles, color: 'black' }), // Change the color of the selected value
    };

    return (
        <div className='flex items-center justify-center min-h-screen gap-5 flex-col'>
            <div className='card flex items-center justify-center h-[50vh] p-2 gap-5 flex-col'>

                <div className='mb-10'>
                    <h1 className='text-2xl leading-none underline'>Welcome to your quiz</h1>
                </div>
                <div className='w-[75vw] md:w-[35vw]'>
                    <Select
                        value={categoryArray?.value}
                        onChange={(e) => setSelectedCategory(e.value)}
                        options={categoryArray}
                        styles={darkModeStyles} // Apply the dark mode styles
                        placeholder='Select Category...'
                    />
                </div>

                <div className='w-[75vw] md:w-[35vw]'>
                    <Select
                        value={options.label}
                        onChange={(e) => { setModeType(e.value) }}
                        options={options}
                        styles={darkModeStyles} // Apply the dark mode styles
                        placeholder='Difficulty...'
                    />
                </div>


                <div className='w-[75vw] md:w-[35vw]'>
                    <Select
                        value={numberOfQuestionsArray.label}
                        onChange={(e) => { setNumberOfQuestion(e.value) }}
                        options={numberOfQuestionsArray}
                        styles={darkModeStyles} // Apply the dark mode styles
                        placeholder='Number of Questions...'
                    />
                </div>

                <div className='w-[35vw] flex justify-center cursor-pointer'>
                    {selectedCategory && modeType && numberOfQuestion ? <Link href={'/start'}><NextArrow /></Link> : null}
                </div>
            </div>
        </div>
    );
};

export default Page;
