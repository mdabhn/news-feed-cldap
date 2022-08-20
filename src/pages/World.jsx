import React, { useContext, useEffect, useState } from 'react'
import { ContextApi } from '../App'
import CardContianer from '../components/card/CardContianer'

const World = () => {
  const { searchContext } = useContext(ContextApi)

  const [worldData, setWorldData] = useState([])
  const [filteredWorldData, setFilteredWorldData] = useState([])

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.status) {
          console.log(res)
          if (res.status === 'OK') {
            setWorldData(res.results)
            setFilteredWorldData(res.results)
            localStorage.setItem('nf-wr', JSON.stringify(res.results))
          }
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    // setWorldData(JSON.parse(localStorage.getItem('wr-world')))
    // setFilteredWorldData(JSON.parse(localStorage.getItem('wr-world')))
  }, [])

  useEffect(() => {
    if (searchContext.length !== 0) {
      setFilteredWorldData(
        worldData.filter((d) => {
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
      setFilteredWorldData(worldData)
    }
  }, [searchContext, worldData])

  return (
    <>
      <div className='lg:p-12'>
        <section className='header flex justify-center mb-20'>
          <h1 className='font-bold text-2xl lg:mt-0 mt-3'>
            Todays Top World News
          </h1>
        </section>
        {worldData.length > 0 ? (
          <div
            id='container'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {filteredWorldData.map((data) => (
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
      </div>
      {filteredWorldData.length === 0 && (
        <p className='text-center'>
          SORRY, No data availbe with searched context
        </p>
      )}
    </>
  )
}

export default World
