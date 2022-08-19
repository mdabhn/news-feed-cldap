import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CardContianer = ({ section, title, abstract, url, multimedia }) => {
  return (
    <>
      {multimedia !== null && (
        <Card style={{ width: '18rem' }}>
          <Badge className='absolute right-2 top-2' bg={'info'}>
            {section}
          </Badge>
          <Card.Img
            variant='top'
            src={multimedia !== null ? multimedia[1].url : ''}
            alt={section}
          />

          <Card.Body>
            <Card.Title title={title}>
              {title.lenght < 15 ? title : title.slice(0, 20) + '...'}
            </Card.Title>
            <Card.Text
              className='text-muted'
              style={{ minHeight: '100px' }}
              title={abstract}
            >
              {abstract
                ? abstract.length < 100
                  ? abstract
                  : abstract.slice(0, 100) + '...'
                : 'No details available...'}
            </Card.Text>
            <Button variant='dark' className='text-green-900 w-full mt-6'>
              Read Deatils
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default CardContianer
