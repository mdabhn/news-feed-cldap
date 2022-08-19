import React, { useState, useEffect } from 'react'
import CardContianer from '../components/card/CardContianer'

const Home = () => {
  const [homeData, setHomeData] = useState([])

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.status) {
          console.log(res)
          if (res.status === 'OK') {
            setHomeData(res.results)
            localStorage.setItem('nf-home', JSON.stringify(res.results))
          }
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    // setHomeData(JSON.parse(localStorage.getItem('nf-home')))
  }, [])

  return (
    <>
      <div className='lg:p-12'>
        <section className='header flex justify-center mb-20'>
          <h1 className='font-bold text-2xl lg:mt-0 mt-3'>Todays Top News</h1>
        </section>
        {homeData.length > 0 ? (
          <div
            id='container'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {homeData.map((data) => (
              <div style={{ padding: '10px' }}>
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

export default Home
