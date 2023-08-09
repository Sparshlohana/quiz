'use client'

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Page = () => {
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    let [questionIndex, setQuestionIndex] = useState(0);
    const [correctAns, setCorrectAns] = useState(null);
    const router = useRouter()


    const handleRadioChange = (index, item) => {
        setSelectedOption(index);
        // setSelectOptionItem(item);

        if (item === correctAns) {
            setQuestionIndex(++questionIndex)
            successNoise()
            handleUpdateData()
        }
        else {
            router?.push('/');
            errorNoise();
        }
    };

    useEffect(() => {
        hadleFetchData()
    }, [])

    console.log(data);
    const handleUpdateData = () => {

        if (data?.length > 0) {
            const firstQuestion = data[questionIndex];
            const allAnswers = [...firstQuestion.incorrect_answers, firstQuestion.correct_answer];
            setCorrectAns(firstQuestion.correct_answer);
            const shuffledAnswers = shuffleArray(allAnswers);
            firstQuestion.shuffledAnswers = shuffledAnswers;
            console.log(firstQuestion);
        }

    }

    const hadleFetchData = async () => {
        const fetchData = await fetch('https://opentdb.com/api.php?amount=15')
        const dataJson = await fetchData.json()

        // Randomly shuffle the correct and incorrect answers for the first question
        if (dataJson.results.length > 0) {
            const firstQuestion = dataJson.results[questionIndex];
            const allAnswers = [...firstQuestion.incorrect_answers, firstQuestion.correct_answer];
            setCorrectAns(firstQuestion.correct_answer);
            const shuffledAnswers = shuffleArray(allAnswers);
            firstQuestion.shuffledAnswers = shuffledAnswers;
        }

        setData(dataJson.results)
    }


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const successNoise = () => toast.success('Correct', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const errorNoise = () => toast.error('Wrong', toast.error('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }));

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex items-center justify-center min-h-screen flex-col gap-3">
                <div className="w-[70vw] ">
                    {data.length > 0 && (
                        <div className="">
                            <span className="text-3xl">Q{questionIndex + 1}{")"} </span>
                            <span className="text-3xl" dangerouslySetInnerHTML={{ __html: data[0]?.question }}></span>
                        </div>
                    )}
                    {data.length > 0 && (
                        <div className="">
                            {data[0]?.shuffledAnswers?.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 w-[70vw]">
                                    <input
                                        type="radio"
                                        name="options"
                                        id={`option${index}`}
                                        className="hidden"
                                        checked={selectedOption === index}
                                        onChange={() => handleRadioChange(index, item)}
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
                                        <p className="text-2xl" dangerouslySetInnerHTML={{ __html: item }}></p>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page;
