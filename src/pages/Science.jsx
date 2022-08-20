import React, { useContext, useEffect, useState } from 'react'
import { ContextApi } from '../App'
import CardContianer from '../components/card/CardContianer'

const Science = () => {
  const { searchContext } = useContext(ContextApi)

  const [scienceData, setScienceData] = useState([])
  const [filteredScienceData, setFilteredScienceData] = useState([])

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.status) {
          console.log(res)
          if (res.status === 'OK') {
            setScienceData(res.results)
            setFilteredScienceData(res.results)
            localStorage.setItem('nf-sc', JSON.stringify(res.results))
          }
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    // setScienceData(JSON.parse(localStorage.getItem('nf-sc')))
    // setFilteredScienceData(JSON.parse(localStorage.getItem('nf-sc')))
  }, [])

  useEffect(() => {
    if (searchContext.length !== 0) {
      setFilteredScienceData(
        scienceData.filter((d) => {
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
      setFilteredScienceData(scienceData)
    }
  }, [searchContext, scienceData])

  return (
    <>
      <div className='lg:p-12'>
        <section className='header flex justify-center mb-20'>
          <h1 className='font-bold text-2xl lg:mt-0 mt-3'>
            Todays Top Scinece News
          </h1>
        </section>
        {scienceData.length > 0 ? (
          <div
            id='container'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {filteredScienceData.map((data) => (
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
    </>
  )
}

export default Science
