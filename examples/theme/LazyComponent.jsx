import React from 'react'

export const LazyComponent = (props) => {
  const [count, setCount] = React.useState(1)
  console.log('LazyComponent', props, count)

  // return <div>LazyComponent</div>
  return (
    <div>
      {Array(count)
        .fill(null)
        .map((_, idx) => {
          console.log(idx)
          return (
            <div key={idx}>
              LazyComponent
              {idx}
              <div>
                <button
                  onClick={() => {
                    setCount((prev) => prev + 1)
                  }}
                >
                  add
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}
export default LazyComponent
