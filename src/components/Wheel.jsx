import React, { useState, useRef } from 'react'
import { Wheel as SpinWheel } from 'react-custom-roulette'

const Wheel = ({ setShowModal, teamData, currentSelectedTeamID, setTeamData }) => {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [assigned, setAssigned] = useState(null)

  const spinSoundRef = useRef(null)
  const assignedSoundRef = useRef(null)

  const assignedTeamIDs = teamData
    .filter(team => team.allotedDesignTeamID !== null)
    .map(team => team.allotedDesignTeamID)

  const eligibleTeams = teamData.filter(team =>
    team.id !== currentSelectedTeamID &&
    !assignedTeamIDs.includes(team.id)
  )

  const currentSelectedTeam = teamData.find(team => team.id === currentSelectedTeamID)

  const wheelData = eligibleTeams.map(team => ({
    option: team.name
  }))

  const handleSpinClick = () => {
    if (eligibleTeams.length === 0) return alert('No eligible teams left to assign!')

    const randomIndex = Math.floor(Math.random() * eligibleTeams.length)
    setPrizeNumber(randomIndex)
    setMustSpin(true)
    setAssigned(null)

    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0
      spinSoundRef.current.play()
    }
  }

  const handleStopSpinning = () => {
    setMustSpin(false)

    const selectedTeam = eligibleTeams[prizeNumber]
    setAssigned(selectedTeam.name)

    const updatedTeams = teamData.map(team => {
      if (team.id === currentSelectedTeamID) {
        return {
          ...team,
          allotedDesignTeamID: selectedTeam.id,
          isAllotedDesign: true,
        }
      }
      return team
    })

    localStorage.setItem('teamsData', JSON.stringify(updatedTeams))

    setTeamData(updatedTeams)

    if (assignedSoundRef.current) {
      assignedSoundRef.current.currentTime = 0
      assignedSoundRef.current.play()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full relative flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Spin the Wheel 🎯
        </h2>

        <SpinWheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          backgroundColors={[
            '#FF6384', // Pink
            '#36A2EB', // Blue
            '#FFCE56', // Yellow
            '#4BC0C0', // Teal
            '#9966FF', // Purple
            '#FF9F40', // Orange
            '#00A86B', // Jade Green
            '#FF6B6B', // Coral Red
            '#FFD700', // Gold
            '#8A2BE2', // Blue Violet
            '#00CED1', // Dark Turquoise
            '#FF1493', // Deep Pink
          ]}
          textColors={['#ffffff']}
          outerBorderColor="#222"
          outerBorderWidth={5}
          spinDuration={0.33}
          numberOfSpins={10}
          innerBorderColor="#fff"
          radiusLineColor="#dedede"
          radiusLineWidth={2}
          fontSize={34}
          onStopSpinning={handleStopSpinning}
        />

        <button
          className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-xl"
          onClick={handleSpinClick}
          disabled={mustSpin}
        >
          {mustSpin ? 'Spinning...' : '🎡 Spin to Assign'}
        </button>

        {assigned && (
          <p className="mt-6 text-2xl text-blue-700 font-bold">
            🎉 {currentSelectedTeam.name} is assigned design of {assigned}
          </p>
        )}

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>

        <audio ref={spinSoundRef} src="/sounds/spin.wav" />
        <audio ref={assignedSoundRef} src="/sounds/assigned.wav" />
      </div>
    </div>
  )
}

export default Wheel