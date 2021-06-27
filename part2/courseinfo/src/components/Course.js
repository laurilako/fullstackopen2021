import React from 'react'

const Course = ({courses}) => {
    return(
      <div>
        {courses.map((course) => {
          return(
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts} />
          </div>
          )
        })}
      </div>
    )
  }

const Content = ({parts}) => {
  return(
    <div>
      {parts.map((part) => {
        return(
          <div key={part.id}>
            <Part name={part.name} exercises={part.exercises} />
          </div>    
        )
      })}
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Total = (props) => {
  const tot = props.exercises.map(prop => prop.exercises)
  const sum = tot.reduce((a, b) => a + b, 0)
  return(
    <div>
      Total of {sum} exercises
    </div>
  )
}
  
export default Course