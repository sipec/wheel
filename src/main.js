import './style.css'

// jQuery at home
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// i believe in the high trust society
const API_KEY = 'LiNK1ehaCg7VDaRC2EYbv7TOk86PzAxE8JSyGIhD'
const API_URL = 'https://api.quantumnumbers.anu.edu.au'

const randomNumber = async () => {
 await fetch(`${API_URL}?length=1&type=uint8`, {
  method: 'GET',
  'x-api-key': API_KEY,
 })
}
