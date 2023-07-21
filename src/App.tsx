import Footer from './Footer'
import TrafficLights from './TrafficLights'

function App() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <TrafficLights />
      <Footer />
    </div>
  )
}

export default App
