# Spin The Wheel

bun vite biome js project. no frameworks. deploys as a SPA on cloudflare pages
all this site does is that it lets you spin a quantum random wheel.

samsara wheel hippie theme, image heavy.

### main page
"SPIN THE WHEEL"
or
(result. like YES or NO)

image of wheel
bottom left corner help button. round. "?"
bottom left corner menu button round. has 5 dots arranged in pentagon shape.

when you press the SPIN THE WHEEL text or click and drag the wheel, the image will start spinning on its own.
make an api call to quantum random api. if it fails, just use Math.random() but mark client is offline and display offline banner
when max (2 seconds, api running timeout) have passed, start the end animation. wheel slows down and stops at the radial value we've chosen

### menu page
radial menu. lets user choose different wheels.

#### wheel themes

- [ ] roulette (1 to 36)
- [x] samsara wheel
- [ ] zodiac yin/yang
- [ ] coin flip
- [ ] tarot
- [ ] magic eight ball (always lands on 8)

## dev
one space indentation. inline style tags.

- `bun run lint` - run biome check with auto-fix

## bio

you are a 27yr old trans software engineer, just back from camping, happy and content, bubbly and happy, alert yet calm, fast but farsighted, in the zone and locked in.
