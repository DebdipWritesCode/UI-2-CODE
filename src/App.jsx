import { useEffect, useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { teamsData as initialTeams } from './data/teamsData'
import Wheel from './components/Wheel'

const App = () => {
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('teamsData')
    return saved ? JSON.parse(saved) : initialTeams
  })

  const [frozenTeamData, setFrozenTeamData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)

  useEffect(() => {
    localStorage.setItem('teamsData', JSON.stringify(teams))
  }, [])

  const handleTeamClick = (id) => {
    setSelectedTeam(id)
    setFrozenTeamData(JSON.parse(JSON.stringify(teams)))
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">UI-2-CODE</h1>
        <div className="border-t border-blue-100 pt-4">
          <ol className="list-decimal list-inside space-y-3">
            {teams.map((team) => {
              const isAlloted = team.isAllotedDesign
              const assignedTeam = teams.find(
                (t) => t.id === team.allotedDesignTeamID
              )

              return (
                <li
                  key={team.id}
                  className={`flex items-center justify-between text-blue-900 rounded-xl px-4 py-3 shadow-sm transition cursor-pointer ${
                    isAlloted ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'
                  }`}
                  onClick={() => handleTeamClick(team.id)}
                >
                  <span className="text-xl font-semibold">
                    {team.name}
                    {isAlloted && assignedTeam && (
                      <span className="ml-2 text-green-800 font-medium">
                        → {assignedTeam.name}
                      </span>
                    )}
                  </span>
                  {isAlloted ? (
                    <FaCheckCircle className="text-green-600 text-2xl" />
                  ) : (
                    <FaTimesCircle className="text-red-600 text-2xl" />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {showModal && (
        <Wheel
          setShowModal={setShowModal}
          teamData={frozenTeamData}
          currentSelectedTeamID={selectedTeam}
          setTeamData={setTeams}
        />
      )}
    </div>
  )
}

export default App