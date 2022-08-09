import React, { useState } from 'react';
import './App.css';
import './assets/styles/style.css'; 
import { AnswersList, Chats, FormDialog } from './components/index';
import { db } from "./firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import { useCallback } from 'react';
import { useEffect } from 'react';


const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);
  
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    
  addChats({
    text : nextDataset.question,
    type : 'question'
  })
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
}

const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
  switch (true) {
      // お問い合わせが選択された場合
      case (nextQuestionId === 'contact'):
          handleOpen();
          break;

      // リンクが選択された時
      case /^https:*/.test(nextQuestionId):
          const a = document.createElement('a');
          a.href = nextQuestionId;
          a.target = '_blank';
          a.click();
          break;

      // 選択された回答をchatsに追加
      default:
          // 現在のチャット一覧を取得
          addChats({
              text: selectedAnswer,
              type: 'answer'
          })

          setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750)
          break;
  }
},[answers]);

      const addChats = useCallback((chat) => {
        setChats(prevChats => {
            return [...prevChats, chat]
        })
    },[setChats]);

    const handleOpen = useCallback(() => {
      setOpen(true)
  },[setOpen]);
      
      const handleClose = useCallback(() => {
        setOpen(false)
      },[setOpen]);
      
      useEffect(() => { 
        (async () => {
          const initDataset = {};
          const questionsCol =  collection(db, 'question');
          const questionsSnapshot = await getDocs(questionsCol);
          questionsSnapshot.forEach(doc => {
            const id = doc.id
            const data = doc.data()
            initDataset[id] = data
          });
          setDataset(initDataset)
          displayNextQuestion(currentId, initDataset[currentId])
        })()
      }, [])


useEffect(() => {
  const scrollArea = document.getElementById("scroll-area");
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
})

  return (
    <section className='c-section'>
      <div className="c-box">
        <Chats chats={chats}/>
        <AnswersList answers={answers} select={selectAnswer}/>
        <FormDialog open={open} handleClose={handleClose}/>
      </div>
    </section>
  );
}


export default App