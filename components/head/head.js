import Head from 'next/head';
export default function HeadComponent({title}){
    return (
          <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="Rodrigo Lima"/>
                <meta name="description" content="Calendar App"/>
          </Head>
    )
}