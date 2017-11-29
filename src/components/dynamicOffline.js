import dynamic from 'next/dynamic';

const dynamicOffline = dynamic(import('./offline'), {
    ssr: false,
});

export default dynamicOffline;
