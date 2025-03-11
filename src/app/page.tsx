'use client';
import localFont from 'next/font/local';
import styles from "./page.module.css";
import MatchsStatistic from './components/MatchsStatistics';
import { mutate } from "swr";
import { useState } from 'react';


const tacticSans = localFont({ src: '../fonts/tactic-sans-regular-italic.woff2' })

export default function Home() {

  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    mutate("https://app.ftoyd.com/fronttemp-service/fronttemp");
  };



  return (
    <div className={`${styles.page} p-[42px]`}>
      <header className='flex justify-between'>
        <h1 className={`${tacticSans.className} text-[32px]`}>Match Tracker</h1>
        <div className='flex gap-[12px]'>
          {error && 
            <div className='bg-[#0F1318] flex items-center px-[24px] py-[17px] gap-[10px] rounded-sm'>
              <div className='bg-[url(/images/alert-triangle.svg)] size-[28px]'></div>
              <p>Ошибка: не удалось загрузить информацию</p>
            </div>
          }
          <button className='flex gap-[10px] font-semibold bg-[#EB0237] px-[40px] py-[15px] text-lg/[22px] rounded-sm hover:bg-[#A01131] hover:cursor-pointer active:bg-[#A01131] items-center' onClick={handleFetch}>
            Обновить 
            <div className={`bg-[url(/images/refresh.svg)] size-[26px] ${isLoading && 'animate-spin'}`}></div>
          </button>
        </div>
      </header>
      <main>
        <MatchsStatistic setError={setError} setLoading={setLoading} />
      </main>
    </div>
  );
}
