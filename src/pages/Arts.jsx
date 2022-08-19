import React, { useEffect, useState } from 'react'
import CardContianer from '../components/card/CardContianer'

const Arts = () => {
  const [artsData, setArtsData] = useState([])

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.status) {
          console.log(res)
          if (res.status === 'OK') {
            setArtsData(res.results)
            localStorage.setItem('nf-wr', JSON.stringify(res.results))
          }
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    // setArtsData(JSON.parse(localStorage.getItem('wr-world')))
  }, [])

  return (
    <>
      <div className='lg:p-12'>
        <section className='header flex justify-center mb-20'>
          <h1 className='font-bold text-2xl lg:mt-0 mt-3'>
            Todays Top World News
          </h1>
        </section>
        {artsData.length > 0 ? (
          <div
            id='container'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {artsData.map((data) => (
              <div style={{ padding: '10px' }} key={data.created_date}>
                <CardContianer
                  section={data.section}
                  multimedia={data.multimedia}
                  title={data.title}
                  abstract={data.abstract}
                  url={data.url}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center'>loading...</p>
        )}
      </div>
    </>
  )
}

export default Arts
