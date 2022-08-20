import React, { useContext, useEffect, useState } from 'react'
import { ContextApi } from '../App'
import CardContianer from '../components/card/CardContianer'

const US = () => {
  const { searchContext } = useContext(ContextApi)

  const [usData, setUSData] = useState([])
  const [filteredUsData, setFilteredUsData] = useState([])

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.status) {
          console.log(res)
          if (res.status === 'OK') {
            setUSData(res.results)
            setFilteredUsData(res.results)
            localStorage.setItem('nf-us', JSON.stringify(res.results))
          }
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    // setUSData(JSON.parse(localStorage.getItem('nf-us')))
    // setFilteredUsData(JSON.parse(localStorage.getItem('nf-us')))
  }, [])

  useEffect(() => {
    if (searchContext.length !== 0) {
      setFilteredUsData(
        usData.filter((d) => {
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
      setFilteredUsData(usData)
    }
  }, [searchContext, usData])

  return (
    <>
      <div className='lg:p-12'>
        <section className='header flex justify-center mb-20'>
          <h1 className='font-bold text-2xl lg:mt-0 mt-3'>
            Todays Top US News
          </h1>
        </section>
        {usData.length > 0 ? (
          <div
            id='container'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {filteredUsData.map((data) => (
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

        {usData.length > 0 && filteredUsData.length === 0 && (
          <p className='text-center'>
            SORRY, No data availbe with searched context
          </p>
        )}
      </div>
    </>
  )
}

export default US
