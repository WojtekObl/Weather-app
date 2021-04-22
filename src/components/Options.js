import React from 'react'

function Options({ options, handleForecast, setShowOptions }) {
    return (
        <div>
            {Object.keys(options).map((location) =>
                <button
                    onClick={() => {
                        handleForecast(options[location])
                        setShowOptions(false)
                    }}
                    key={location}
                >
                    {options[location].name}, {options[location].country}
                </button>
            )
            }
        </div>
    )
}

export default Options
