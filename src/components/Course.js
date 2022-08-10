import React from 'react'

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

const Content = ({parts}) => {
  const total = parts.reduce((prev, curr) => 
    {
      return (prev + curr.exercises)
    },
  0)
  return (
    <div>
      {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <p><b>Total is</b> {total}</p>
    </div>
  )
}

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Header = (props) => (
  <h1>{props.name}</h1>
)


export default Course