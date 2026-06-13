# Vedic Astrology Academy

An interactive web-based educational platform for learning Vedic Astrology (Jyotish) fundamentals through visualization, structured learning modules, and quizzes.

## Features

### 🔮 Interactive Birth Chart
- **South Indian Style Chart**: Traditional fixed-sign layout with clockwise house system
- **12 Zodiac Signs**: Complete with Sanskrit names (Mesha, Vrishaba, etc.)
- **Planetary Positions**: Visual representation of planets and Lagna (Ascendant)
- **Clickable Learning**: Select any chart cell to learn about:
  - Sign names (English and Sanskrit)
  - House number and significance
  - Ruling planet for each sign

## Learning Modules

The academy is organized into six structured modules, each accessible from the study panel.

### 📖 Module 1: The 27 Nakshatras
- **Complete reference** for all 27 lunar mansions, from Ashwini through Revati
- Each nakshatra includes:
  - **Ruling planet** (Vimshottari dasha lord)
  - **Ruling deity**
  - **Degree span** in the sidereal zodiac (each spans 13°20')
  - **Associated symbols**, including common alternates
- **Nakshatra Quiz**: Identify the nakshatra from its symbol (4 shuffled options per question); correct answers reveal the full details

### ⭐ Module 2: Planetary Yogas
- **13 Major Yogas**, including:
  - The five **Pancha Mahapurusha Yogas**: Ruchaka, Bhadra, Hamsa, Malavya, Shasha
  - **Gaja Kesari**, **Raja Yoga**, **Dhana Yoga**, **Viparita Raja Yoga**, **Neecha Bhanga Raja Yoga**
  - **Budha-Aditya**, **Chandra-Mangala**, **Parivartana**
- **13 Secondary Yogas**, including:
  - Moon-based: Sunapha, Anapha, Durudhara, Kemadruma, Adhi, Shakata
  - Sun-based: Vesi, Vasi, Ubhayachari
  - Amala, Lakshmi, Saraswati, Kala Sarpa
- Each yoga card shows its **formation rule**, **color-coded nature** (auspicious / challenging / mixed), and **effects**
- **Yoga Quiz**: Identify which yoga is formed by a given planetary combination

### 🪐 Module 3: The 9 Grahas
- All nine planets of Jyotish: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu
- Each graha includes:
  - Sanskrit name and benefic/malefic nature
  - Core significations
  - Own sign(s), exaltation and debilitation degrees
  - Planetary friendships and enmities

### ⏳ Module 4: Vimshottari Dasha
- The complete 120-year planetary period cycle in its fixed order:
  - Ketu (7) → Venus (20) → Sun (6) → Moon (10) → Mars (7) → Rahu (18) → Jupiter (16) → Saturn (19) → Mercury (17)
- How the sequence begins from the lord of the Moon's nakshatra at birth
- Introduction to antardashas (sub-periods)

### 🏛️ Module 5: The 12 Houses (Bhavas)
- Every house with its Sanskrit name and significations
- House categories explained: **Kendra** (1, 4, 7, 10), **Trikona** (1, 5, 9), **Dusthana** (6, 8, 12), **Upachaya** (3, 6, 10, 11), and **Maraka** (2, 7)

### 👁️ Module 6: Planetary Aspects (Drishti)
- The general rule: every planet fully aspects the 7th house from itself
- Special aspects:
  - **Mars**: 4th, 7th, 8th
  - **Jupiter**: 5th, 7th, 9th
  - **Saturn**: 3rd, 7th, 10th
  - **Rahu & Ketu**: 5th, 7th, 9th (per many traditions)

## House Meanings

Clicking any chart cell shows the house's significance relative to the example Lagna:

| House | Keyword |
|-------|---------|
| 1st | Self/Body |
| 2nd | Wealth |
| 3rd | Effort |
| 4th | Home |
| 5th | Children |
| 6th | Health |
| 7th | Partners |
| 8th | Longevity |
| 9th | Dharma |
| 10th | Career |
| 11th | Community & Group Activities |
| 12th | Loss |

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required

### Usage
1. Open `index.html` in your web browser
2. View the South Indian birth chart with example planetary positions
3. Click on any cell in the chart to learn about that sign and house
4. Use the module buttons in the study panel to explore:
   - The 27 Nakshatras (guide + quiz)
   - Planetary Yogas (Major/Secondary tabs + quiz)
   - The 9 Grahas, Vimshottari Dasha, the 12 Houses, and Planetary Aspects

## Technical Details

### Built With
- **HTML5**: Structure and content
- **CSS3**: Styling with custom properties for theming
- **Vanilla JavaScript**: Interactive functionality — no frameworks or build step

### Design Philosophy
- **Traditional Color Scheme**: Gold, brown, and cream colors reflecting Vedic traditions
- **Responsive Layout**: Flexbox-based design that adapts to different screen sizes
- **Educational Focus**: Clear, intuitive interface for learning complex concepts
- **Card-Based Reference**: Scrollable card lists with a shared module viewer for consistent browsing

### Chart Layout
The South Indian chart uses a 4×4 grid with:
- Fixed sign positions (signs don't rotate)
- Center area for chart identification
- Houses calculated clockwise from the Ascendant (Lagna)

## Example Chart

The default chart includes:
- **Lagna (Ascendant)**: Taurus (Vrishaba)
- **Sun**: Leo (Simha)

This creates a sample birth chart for educational purposes.

## Future Enhancements

Potential features for future development:
- [ ] User input for custom birth data (date, time, location)
- [ ] North Indian chart style option
- [ ] Dasha (planetary periods) calculator from birth data
- [ ] Divisional charts (vargas) such as Navamsa (D9)
- [ ] Transits (gochara) and their interpretation
- [ ] More quiz topics (grahas, houses, aspects, dashas)
- [ ] Chart interpretation guidance
- [ ] Save and load charts
- [ ] Print functionality

## Educational Resources

This tool is designed as an introduction to Vedic Astrology. Key concepts covered:
- **Rashis (Signs)**: 12 zodiac signs and their Sanskrit names
- **Bhavas (Houses)**: 12 houses, their categories, and life areas
- **Grahas (Planets)**: All 9 planets with dignities and friendships
- **Nakshatras**: All 27 lunar mansions with rulers, deities, degrees, and symbols
- **Yogas**: 26 planetary combinations, major and secondary
- **Dashas**: The Vimshottari 120-year planetary period system
- **Drishti**: Planetary aspects, general and special
- **Lagna**: Rising sign/Ascendant at birth

## Contributing

Contributions are welcome! Areas for contribution:
- Additional educational content
- More quiz questions and topics
- Chart calculation algorithms
- UI/UX improvements
- Documentation

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Traditional Vedic Astrology principles and teachings
- South Indian chart visualization methodology
- Sanskrit terminology from classical Jyotish texts

---

**Note**: This is an educational tool. For professional astrological consultations, please consult a qualified Vedic astrologer.
