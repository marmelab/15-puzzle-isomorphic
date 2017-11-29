import dynamic from 'next/dynamic';

const dynamicOnline = dynamic(import('./online'), {
    ssr: false,
});

export default dynamicOnline;
