"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import useSWR from "swr";

interface IMatch {
  time: string,
  title: string,
  homeTeam: {
    name: string,
    players:
      {
        username: string,
        kills: number
      }[],
    points: number,
    place: number,
    total_kills: number
  },
  awayTeam: {
    name: string,
    players:
      {
        username: string,
        kills: number
      }[],
    points: number
    place: number,
    total_kills: number
  },
  homeScore: number,
  awayScore: number,
  status: 'Scheduled' | 'Ongoing' |'Finished'
}

interface IMatchRequest {
  ok: boolean,
  data: {
    matches: IMatch[]
  }
}

const statusText: Record<IMatch["status"], string> = {
  Scheduled: "Match preparing",
  Ongoing: "Live",
  Finished: "Finished",
};

const statusStyles: Record<IMatch["status"], string> = {
  Scheduled: "bg-[#EB6402] px-[8px] py-[6px]",
  Ongoing: "bg-[#43AD28] px-[34px] py-[6px]",
  Finished: "bg-[#EB0237] px-[21px] py-[6px]",
};

const fetcher = async (url: string, options?: RequestInit): Promise<IMatchRequest> => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Ошибка запроса");
  return res.json();
}

interface IMatchsStatistic {
  setError: Dispatch<SetStateAction<null | Error>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

function MatchsStatistic({ setError, setLoading }: IMatchsStatistic) {
  const { data, error, isLoading } = useSWR(`https://app.ftoyd.com/fronttemp-service/fronttemp`, fetcher,  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  })

  useEffect(() => {
    setError(error);

    if (data) {
      setLoading(false);
    }
  }, [error, isLoading, data, setError, setLoading])
 
  return (
    <section className='mt-[20px] flex flex-col gap-[12px]'>
      
      {data && data.data.matches.length > 0 && data.data.matches.map((item: IMatch, i: number) => (
        <div key={i} className='grid w-full grid-cols-[1fr_minmax(92px,_112px)_1fr] gap-[32px] bg-[#0B0E12] px-[36px] py-[19.5px] rounded-sm'>
          <div className='flex gap-[14px] items-center'>
            <Image src={'images/teamLogo.svg'} alt='Логотип команды' width={48} height={48} />
            <p>{item.homeTeam.name}</p>
          </div>
          
          <div className='flex flex-col gap-[4px]'>
            <p className='text-center font-semibold text-xl/[24px]'>{item.homeScore}:{item.awayScore}</p>
            <button className={`font-semibold text-xs/[15px] rounded-sm ${statusStyles[item.status]}`}>{statusText[item.status]}</button>
          </div>
          
          <div className='flex gap-[14px] items-center justify-end'>
            <p className='overflow-hidden'>{item.awayTeam.name}</p>
            <Image src={'images/teamLogo.svg'} alt='Логотип команды' width={48} height={48} />
          </div>
          
        </div>
      ))}
  </section>

  )
}

export default MatchsStatistic;