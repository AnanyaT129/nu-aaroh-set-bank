const {shows, sets} = require("../db/database")

const resolvers = {
  Query: {
    getAllSets: (_, args) => {
      // Destructure filtering parameters from args
      const {
        setName,
        songs,
        musicStyles,
        instrumentation,
        languages,
        raag,
        key,
        setLead,
        date,
        name,
      } = args;

      // Apply filters to the sets array
      return sets.filter((set) => {
        // Check if each field matches the filter criteria, if provided
        const matchesSetName = setName ? set.setName.includes(setName) : true;
        const matchesSongs = songs
          ? songs.some((song) => set.songs.includes(song))
          : true;
        const matchesMusicStyles = musicStyles
          ? musicStyles.some((style) => set.musicStyles.includes(style))
          : true;
        const matchesInstrumentation = instrumentation
          ? instrumentation.some(
              (instrument) => set.instrumentation.includes(instrument)
            )
          : true;
        const matchesLanguages = languages
          ? languages.some((language) => set.languages.includes(language))
          : true;
        const matchesRaag = raag ? raag.some((raagItem) => set.raag.includes(raagItem)) : true;
        
        // For the mostRecentPerformance:
        const matchesKey = key ? set.mostRecentPerformance.key.includes(key) : true;
        const matchesSetLead = setLead
          ? set.mostRecentPerformance.setLead.some((lead) => setLead.includes(lead))
          : true;
        const matchesDate = date ? set.mostRecentPerformance.date.includes(date) : true;
        const matchesName = name ? set.mostRecentPerformance.name.includes(name) : true;

        // Return true if all conditions are met
        return (
          matchesSetName &&
          matchesSongs &&
          matchesMusicStyles &&
          matchesInstrumentation &&
          matchesLanguages &&
          matchesRaag &&
          matchesKey &&
          matchesSetLead &&
          matchesDate &&
          matchesName
        );
      });
    },
    getAllRaags: () => {
      raags = sets.map( s => s.raag).flat()
      return raags.length > 0 ? [...new Set(raags)] : null
    },
    getAllLanguages: () => {
      return [...new Set(sets.map( s => s.languages).flat())]
    },
    getAllStyles: () => {
      return [...new Set(sets.map( s => s.musicStyles).flat())]
    },
    getAllInstruments: () => {
      return [...new Set(sets.map( s => s.instrumentation).flat())]
    },
    getAllShows: () => {
      return shows
    }
  }
}

module.exports = {resolvers};