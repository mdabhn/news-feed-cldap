import React, { useState, useEffect, useContext } from 'react'
import { ContextApi } from '../App'
import CardContianer from '../components/card/CardContianer'

const Home = () => {
  const { searchContext } = useContext(ContextApi)

  const [homeData, setHomeData] = useState([])
  const [filteredHomeData, setFilteredHomeData] = useState([])

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
            setFilteredHomeData(res.results)
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
    // setFilteredHomeData(JSON.parse(localStorage.getItem('nf-home')))
  }, [])

  useEffect(() => {
    if (searchContext.length !== 0) {
      setFilteredHomeData(
        homeData.filter((d) => {
          if (
            d.section.toLowerCase().includes(searchContext.toLowerCase()) ||
            d.title.toLowerCase().includes(searchContext.toLowerCase()) ||
            d.abstract.toLowerCase().includes(searchContext.toLowerCase())
          ) {
            return d
          }
          return null
        })
      )
    } else {
      setFilteredHomeData(homeData)
    }
  }, [searchContext, homeData])

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
            {filteredHomeData.map((data) => (
              <div
                style={{ padding: '10px' }}
                key={`${data.created_date}-${data.updated_date}}`}
              >
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
        {homeData.length > 0 && filteredHomeData.length === 0 && (
          <p className='text-center'>
            SORRY, No data availbe with searched context
          </p>
        )}
      </div>
    </>
  )
}

export default Home
