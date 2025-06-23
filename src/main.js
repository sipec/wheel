import './style.css'

// jQuery at home
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// i believe in the high trust society
const API_KEY = 'LiNK1ehaCg7VDaRC2EYbv7TOk86PzAxE8JSyGIhD'
const API_URL = 'https://api.quantumnumbers.anu.edu.au'

let isSpinning = false
let currentRotation = 0
let isDragging = false
let lastMouseAngle = 0

// Wheel outcomes for different themes
const wheelOutcomes = {
 samsara: Array.from({ length: 12 }, (_, i) =>
  i % 2 === 0 ? 'YES' : 'NO',
 ).concat([
  // poisons
  'IDK',
  "I DON'T WANNA",
  'SPIN AGAIN',
  // karma
  'THE GOOD PATH',
  'THE EVIL PATH',
  // realms
  'THE EASY PATH',
  'THE HARD PATH',
  'THE MORE FUN PATH',
  'THE MORE PAINFUL PATH',
  'HELL YEA',
  'HELL NO',
 ]),
 roulette: Array.from({ length: 36 }, (_, i) => (i + 1).toString()),
 coinFlip: ['HEADS', 'TAILS'],
 eightBall: [8],
}

const currentTheme = 'samsara' // Default theme

const getQuantumRandom = async () => {
 try {
  const response = await fetch(`${API_URL}?length=1&type=uint8`, {
   method: 'GET',
   headers: {
    'x-api-key': API_KEY,
   },
  })

  if (!response.ok) throw new Error('API failed')

  const data = await response.json()
  return data.data[0] / 255 // Normalize to 0-1
 } catch (error) {
  console.log('Quantum API failed, using Math.random()', error)
  $('#offline-banner').style.display = 'block'

  return Math.random()
 }
}

const spinWheel = async () => {
 if (isSpinning) return

 isSpinning = true
 const wheel = $('#wheel')
 const spinText = $('#spin-text')
 const resultText = $('#result-text')

 // Hide spin text, show spinning wheel
 spinText.style.display = 'none'
 wheel.classList.add('spinning')

 // Start spinning animation
 wheel.classList.add('wheel-spinning')

 // Get quantum random number
 const randomValue = await getQuantumRandom()

 // Wait for minimum spin time (1-2 seconds)
 const spinTime = 1000 + Math.random() * 1000
 await new Promise((resolve) => setTimeout(resolve, spinTime))

 // Stop fast spinning, start slow down
 wheel.classList.remove('wheel-spinning')

 // Calculate final rotation
 const outcomes = wheelOutcomes[currentTheme]
 const selectedIndex = Math.floor(randomValue * outcomes.length)
 const degreesPerSection = 360 / outcomes.length
 const targetRotation =
  currentRotation +
  360 * 3 +
  selectedIndex * degreesPerSection +
  degreesPerSection / 2

 // Apply slow-down animation
 wheel.style.setProperty('--start-rotation', `${currentRotation}deg`)
 wheel.style.setProperty('--end-rotation', `${targetRotation}deg`)
 wheel.style.setProperty('--slow-duration', '2s')
 wheel.classList.add('wheel-slowing')

 // Wait for slow-down to complete
 setTimeout(() => {
  wheel.classList.remove('wheel-slowing', 'spinning')
  currentRotation = targetRotation % 360
  wheel.style.transform = `rotate(${currentRotation}deg)`

  // Show result
  resultText.textContent = outcomes[selectedIndex]
  spinText.style.display = 'none'
  resultText.style.display = 'block'

  isSpinning = false
 }, 2000)
}

const getMouseAngle = (e, element) => {
 const rect = element.getBoundingClientRect()
 const centerX = rect.left + rect.width / 2
 const centerY = rect.top + rect.height / 2
 const deltaX = e.clientX - centerX
 const deltaY = e.clientY - centerY
 return Math.atan2(deltaY, deltaX) * (180 / Math.PI)
}

// Event listeners
$('#spin-text').addEventListener('click', spinWheel)

$('#wheel').addEventListener('mousedown', (e) => {
 if (isSpinning) return
 isDragging = true
 lastMouseAngle = getMouseAngle(e, $('#wheel'))
 e.preventDefault()
})

document.addEventListener('mousemove', (e) => {
 if (!isDragging || isSpinning) return

 const currentMouseAngle = getMouseAngle(e, $('#wheel'))
 const angleDiff = currentMouseAngle - lastMouseAngle

 currentRotation += angleDiff
 $('#wheel').style.transform = `rotate(${currentRotation}deg)`

 lastMouseAngle = currentMouseAngle
})

document.addEventListener('mouseup', (e) => {
 if (isDragging && !isSpinning) {
  isDragging = false
  // If dragged significantly, trigger spin
  spinWheel()
 }
 isDragging = false
})

// $('#menu-btn').addEventListener('click', () => {
//  alert('Different wheel themes coming soon! 🎨')
// })

// Touch support for mobile
$('#wheel').addEventListener('touchstart', (e) => {
 if (isSpinning) return
 isDragging = true
 const touch = e.touches[0]
 lastMouseAngle = getMouseAngle(touch, $('#wheel'))
 e.preventDefault()
})

document.addEventListener('touchmove', (e) => {
 if (!isDragging || isSpinning) return

 const touch = e.touches[0]
 const currentMouseAngle = getMouseAngle(touch, $('#wheel'))
 const angleDiff = currentMouseAngle - lastMouseAngle

 currentRotation += angleDiff
 $('#wheel').style.transform = `rotate(${currentRotation}deg)`

 lastMouseAngle = currentMouseAngle
 e.preventDefault()
})

document.addEventListener('touchend', (e) => {
 if (isDragging && !isSpinning) {
  isDragging = false
  spinWheel()
 }
 isDragging = false
})
