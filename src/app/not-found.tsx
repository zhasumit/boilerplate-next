// src/app/not-found.tsx
import Bat from '@/components/Bat';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
            className="space-y-6 h-[80vh]"
        >
            <div className='mb-60 -ml-20'>
                <Bat scale={1.4} />
            </div>

            <h1 style={{ fontSize: '3rem', color: 'red' }}>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>

            <Link
                href="/"
                className="text-blue-600 underline transition-transform duration-300 ease-in-out hover:scale-110"
            >
                Go back home
            </Link>

        </div>
    );
}
