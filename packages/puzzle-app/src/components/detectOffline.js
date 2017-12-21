import dynamic from 'next/dynamic';

export const ShowWhenOnline = dynamic(import('./Online'), {
    ssr: false,
});

export const ShowWhenOffline = dynamic(import('./Offline'), {
    ssr: false,
});
