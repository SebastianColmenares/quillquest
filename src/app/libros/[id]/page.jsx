import Head from 'next/head';
import db from '@/libs/db';
import DeleteBookBtn from '@/components/DeleteBookBtn';
import ChangePublishedBtn from '@/components/ChangePublishedBtn';
import { getCurrentUser } from '@/libs/session';

export default async function BookDetailPage({params}) {
      
    const userPerfil = await getCurrentUser();
    const bookId = params.id;

    const books = await db.book.findFirst({
        where: {
            id: bookId,
        },
        include: {
            author: true,
        },
    });

  return (
    <>
    <Head>
        <title>{books?.title} - Quill Quest</title>
        <meta name="description" content={books.description} />
        <meta name="keywords" content={`short stories, ${books?.genreName}, ${books?.authorName}, Quill Quest`} />
        <meta property="og:title" content={`${books?.title} - Quill Quest`} />
        <meta property="og:description" content={books.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://your-domain.com/libros/${books.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${books?.title} - Quill Quest`} />
        <meta name="twitter:description" content={books.description} />
        <meta name="twitter:site" content="@QuillQuest" />
        <meta name="twitter:creator" content="@QuillQuest" />
        <link rel="canonical" href={`https://your-domain.com/libros/${books.id}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://your-domain.com/libros/${books.id}"
              },
              "headline": "${books?.title}",
              "datePublished": "${books?.createdAt}",
              "author": {
                "@type": "Person",
                "name": "${books?.authorName}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Quill Quest",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://your-domain.com/images/logo.png"
                }
              },
              "description": "${books.description}"
            }
          `}
        </script>
      </Head>
    {userPerfil?.email !== books?.author?.email ? (

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-bold">{books?.title}</h1>
                <span>Escrito por: </span>
                <span className='m-2 text-lg'>{books?.authorName} </span>
                <span className='m-2 text-lg'>{books?.genreName} </span>
                <div id='bookContent' dangerouslySetInnerHTML={{ __html: books?.content }} className="mt-4 text-lg "/>
            </div>

            ):(

            <div className="max-w-4xl mx-auto py-8">
                <ul className='flex justify-end gap-10'>
                    <DeleteBookBtn bookId={books.id}/>

                    {!books?.published ? (
                        <>
                            <span className='text-lg bg-red-400 rounded-3xl p-3 '>No publicado</span>
                            <ChangePublishedBtn bookId={books?.id} published={true} label={"Publicar"}/>
                        </> ) :
                    (
                        <>
                            <span className='text-lg bg-lime-400 text-black font-black rounded-3xl p-3'>Publicado</span>
                            <ChangePublishedBtn bookId={books?.id} published={false} label={"Ocultar"}/>
                        </>
                    
                    )}

                </ul>
                
                <h1 id='bookTitle' className="text-3xl font-bold">{books?.title}</h1>
                <span>Escrito por: </span>
                <span className='m-2 text-lg'>{books?.authorName} </span>
                <span className='m-2 text-lg'>{books?.genreName} </span>
                <span id='bookDescription' className='m-2 text-lg'>{books?.description} </span>
                <div id='bookContent' dangerouslySetInnerHTML={{ __html: books?.content }} className="mt-4 text-lg "/>
            </div>
        )
    }
    </>
  )
}