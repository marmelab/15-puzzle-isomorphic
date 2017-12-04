import dynamic from 'next/dynamic';

export const ShowWhenOnline = dynamic(import('./online'), {
    ssr: false,
});

export const ShowWhenOffline = dynamic(import('./offline'), {
    ssr: false,
});
