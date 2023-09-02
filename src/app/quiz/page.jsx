'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/context";
import Loader from "../components/loader/Loader";

const Page = () => {
    const [data, setData] = useState([]);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(45);
    const router = useRouter();
    const { dataList, setDataList, wrongCount, setWrongCount, correctCount, setCorrectCount, selectedCategory, modeType, numberOfQuestion, loader, setLoader } = useThemeContext();

    // to fetch data
    useEffect(() => {
        handleFetchData()
    }, [])

    // to handle the time interval
    useEffect(() => {
        let interval;


        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            handleNextClick();
        }

        return () => clearInterval(interval);

    }, [timer]);


    useEffect(() => {
        setTimer(45); // Reset timer for the new question
    }, [questionIndex]);


    const handleNextClick = () => {
        console.log("next function called");
        if (isOptionSelected || timer === 0) {
            if (questionIndex < data.length - 1) {
                const currentQuestion = data[questionIndex];
                const isCorrect = currentQuestion.userAnswer === currentQuestion.correct_answer;

                currentQuestion.correct = isCorrect;
                handleUpdateData();

                if (isCorrect) {
                    setCorrectCount(correctCount + 1);
                } else {
                    setWrongCount(wrongCount + 1);
                }

                setDataList([...dataList, currentQuestion]);
                setQuestionIndex(questionIndex + 1);
            } else {
                const currentQuestion = data[questionIndex];
                const isCorrect = currentQuestion.userAnswer === currentQuestion.correct_answer;

                currentQuestion.correct = isCorrect;
                setDataList([...dataList, currentQuestion]);

                if (isCorrect) {
                    setCorrectCount(correctCount + 1);
                } else {
                    setWrongCount(wrongCount + 1);
                }

                router.push('/quiz/result');
            }
            setIsOptionSelected(false);
        }
    };


    const handleRadioChange = (index, item) => {
        const updatedData = [...data];
        updatedData[questionIndex].userAnswer = item;
        setData(updatedData);
        setSelectedOption(index);
        setIsOptionSelected(true); // Option is selected, enable the "Next" button
    };


    const handleUpdateData = () => {
        if (data.length > 0) {
            const firstQuestion = data[questionIndex];
            const allAnswers = [...firstQuestion.incorrect_answers, firstQuestion.correct_answer];
            const shuffledAnswers = shuffleArray(allAnswers);
            firstQuestion.shuffledAnswers = shuffledAnswers;
            setSelectedOption(null);
        }
    };

    const handleFetchData = async () => {
        setLoader(true);
        const fetchData = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${selectedCategory}&difficulty=${modeType}`);
        const dataJson = await fetchData.json();

        const dataWithShuffledAnswers = dataJson.results.map((question) => ({
            ...question,
            shuffledAnswers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }));

        setData(dataWithShuffledAnswers);
        setLoader(false);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };



    return (
        <>
            {loader ? <Loader /> : <div className="flex items-center justify-center min-h-screen flex-col gap-3 card">
                <p className="text-lg mt-2">Time remaining: {timer} seconds</p>
                <div className="w-[70vw] ">
                    {data?.length > 0 && (
                        <div className="">
                            <span className="text-2xl md:text-3xl">Q{questionIndex + 1}{")"} </span>
                            <span className="text-2xl md:text-3xl" dangerouslySetInnerHTML={{ __html: data[questionIndex]?.question }}></span>
                        </div>
                    )}
                    {data?.length > 0 && (
                        <div className="my-5">
                            {data[questionIndex]?.shuffledAnswers?.map((item, index) => {

                                return (<>
                                    <div key={index} className="flex items-center w-[70vw]">
                                        <input
                                            type="radio"
                                            name="options"
                                            id={`option${index}`}
                                            className="hidden"
                                            checked={selectedOption === index}
                                            onChange={() => {
                                                handleRadioChange(index, item)
                                            }}
                                        />
                                        <label
                                            htmlFor={`option${index}`}
                                            className="cursor-pointer flex items-center gap-2"
                                        >
                                            <span className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                                                {selectedOption === index && (
                                                    <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                                                )}
                                            </span>
                                            <p className="text-xl md:text-2xl my-1" dangerouslySetInnerHTML={{ __html: item }}></p>
                                        </label>

                                    </div>

                                </>)
                            })}
                        </div>
                    )}
                    <button
                        onClick={handleNextClick}
                        className={`border px-1 w-[100px] text-lg rounded ${isOptionSelected ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!isOptionSelected}
                    >
                        Next
                    </button>

                </div>
            </div>}
        </>
    )
};

export default Page;
