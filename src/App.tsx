import Timer from './components/Timer'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Pomodoro Timer</h1>
        </div>
      </header>
      <main>
        <Timer workDuration={25} breakDuration={5} />
      </main>
    </div>
  )
}

export default App
