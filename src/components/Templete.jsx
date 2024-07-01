import Template from '@/components/Template';
import '@/styles/globals.css';

function Templete({ Component, pageProps }) {
    return (
        <Template>
            <Component {...pageProps} />
        </Template>
    );
}

export default Templete;
