import { useNavigate, Link } from 'react-router-dom';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import axios from 'axios';

import ErrorCard from '../components/errors/ErrorCard.tsx';
import { useLoading } from '@/contexts/LoadingContext.tsx';
import { getPlayerProfile } from '@/api/chess.com.api.ts';

const HomePage = () => {
  const [username, setUsername] = useState<string>('');
  const { setIsLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() === '') {
      return;
    }
    try {
      setIsLoading(true);
      await getPlayerProfile(username.trim());
      navigate(`/player/${username}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.status === 404) {
          setError(`User '${username}' not found`);
        } else {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              'Something went wrong, please try again'
          );
        }
      } else {
        setError('Something went wrong, please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <ErrorCard
        message={error}
        onRetry={() => {
          setError(null);
          setUsername('');
        }}
      />
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center px-4 text-center">
      <div className="flex flex-row text-center gap-2 text-4xl md:text-8xl font-extrabold">
        <span>Chess</span>
        <span className={`text-yellow-400`}>Lens</span>
      </div>

      <p className="flex flex-row flex-wrap gap-1 text-xl font-bold">
        View your
        <Link
          to="https://www.chess.com"
          className="text-green-500 hover:underline"
        >
          Chess.com
        </Link>
        stats in a new way.
      </p>

      <form onSubmit={handleSubmit}>
        <div
          className={`
          flex flex-row items-center gap-1
          input group 
          `}
        >
          <input
            className={`focus:outline-none`}
            value={username}
            placeholder="Chess.com Username"
            onChange={handleChange}
          />
          <button className={`btn`} disabled={username.trim() === ''}>
            Start
          </button>
        </div>
      </form>

      <p className="text-slate-300 text-sm">
        We only access public data through Chess.com API - no password needed.
      </p>
    </div>
  );
};

export default HomePage;
