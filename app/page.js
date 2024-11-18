import Link from 'next/link'
import Notices from './components/Notices'
import { fetchAirtableTable } from './lib/airtable'

export default async function Home() {
  const data = await fetchAirtableTable('bildiri')
  return (
    <>
      <header>
        <h1
          title="Türkiye'deki depremlere ilişkin unutulmaması gerekenleri vurgulayan, yaşanacak
          sonraki depremler için farkındalık yaratmayı amaçlayan, yazı tahtası."
        >
          Deprem Anıtı
        </h1>
        <Link className='btn' href='https://airtable.com/appCgtRpTwFKC69GL/pagLkeRydN8JOr4pV/form'>
          Yeni kayıt gir
        </Link>
      </header>
      <main>
        <Notices data={data} />
      </main>
    </>
  )
}
