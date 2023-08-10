'use client'

import { useThemeContext } from '@/app/context/context';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const { dataList, wrongCount, correctCount } = useThemeContext();
    const [rerender, setRerender] = useState(false);
    const [grade, setGrade] = useState('');

    const clickHandler = (item) => {
        dataList.forEach(elem => {
            if (elem.question === item.question) {
                elem.checkFlag = true;
            }
        })
        setRerender(!rerender)
    }


    const showToast = (grade) => {
        console.log(grade);
        if (grade === 'Excellent' || grade === 'Good') {
            toast.success(`${grade}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error(`${grade}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    useEffect(() => {

        let totalQuestions = correctCount + wrongCount;

        let percentage = (correctCount / totalQuestions) * 100;

        if (percentage >= 80) {
            setGrade("Excellent");
        } else if (percentage >= 60 && percentage < 80) {
            setGrade("Good");
        } else if (percentage >= 33 && percentage < 60) {
            setGrade("Average");
        } else {
            setGrade("Failed");
        }


        if (grade) {
            showToast(grade);
        }

    }, [dataList, correctCount, wrongCount, grade]);


    return (
        <div className='card '>
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
                theme="dark"
            />
            <div className='text-center mt-2'>
                <h1 className='text-3xl underline'>Result</h1>
            </div>

            <div className='text-3xl ml-6'>Your Score is: {correctCount}/{correctCount + wrongCount}</div>

            <div className='scrollbar'>
                {dataList.map((item, questionIndex) => {

                    return (
                        <div className={`m-5 ${item.correct ? 'border-green-400 ' : 'border-red-400'} border border-solid p-4 rounded-[10px] text-xl relative`} key={questionIndex}>
                            {!item.correct ? <button onClick={() => clickHandler(item)} className='absolute right-4 border py-1 px-2 rounded-md text-base'>Check Answer</button>
                                : null}
                            <div>
                                <span>Q{questionIndex + 1}</span> <span dangerouslySetInnerHTML={{ __html: item.question }} />
                            </div>
                            <div>
                                <div className='flex my-2 gap-[7px] flex-wrap'>
                                    {item.shuffledAnswers.map((answer, answerIndex) => {
                                        return (
                                            <div className='w-[45vw]' key={answerIndex}>
                                                <span className={
                                                    (() => {
                                                        if (item.userAnswer === answer && answer === item.correct_answer) {
                                                            return 'text-green-400';
                                                        } else if (item.userAnswer === answer) {
                                                            return 'text-red-400';
                                                        } else if (answer === item.correct_answer && item.checkFlag) {
                                                            return 'text-green-400 underline rounded-md px-1';
                                                        } else {
                                                            return '';
                                                        }
                                                    })()
                                                } dangerouslySetInnerHTML={{ __html: answer }} />

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default Page
