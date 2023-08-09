'use client'

import { useThemeContext } from '@/app/context/context';
import { useEffect, useState } from 'react';

const Page = () => {
    const { dataList, wrongCount, correctCount } = useThemeContext();
    const [rerender, setRerender] = useState(false);
    console.log(dataList);

    const clickHandler = (item) => {
        dataList.forEach(elem => {
            if (elem.question === item.question) {
                elem.checkFlag = true;
            }
        })
        setRerender(!rerender)
    }

    useEffect(() => {

    }, [dataList])

    return (
        <>
            <div className='text-center mt-2'>
                <h1 className='text-3xl underline'>Result</h1>
            </div>
            <div>
                {dataList.map((item, questionIndex) => {
                    const answerLetters = ['A', 'B', 'C', 'D'];
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
                                                            return 'text-green-400';
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

            <div className='text-3xl ml-6'>Your Score is: {correctCount}/{correctCount + wrongCount}</div>
        </>
    )
}

export default Page
